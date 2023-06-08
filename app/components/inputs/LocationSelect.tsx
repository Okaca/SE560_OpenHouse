import React, { useCallback, useState, useEffect } from "react";
import {
  OutlinedInput,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Autocomplete,
  TextField,
} from "@mui/material";
import { GrLocationPin } from "react-icons/gr";

interface LocationSelectProps {
  value?: any[];
  onChange: (value: any[]) => void;
}

const LocationSelect: React.FC<LocationSelectProps> = ({ value, onChange }) => {
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const [selectPosition, setSelectPosition] = useState({});

  const handleSearch = (value: string) => {
    const params = {
      q: value,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      `https://nominatim.openstreetmap.org/search?${queryString}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const parsedResult = JSON.parse(result);
        setListPlace(parsedResult);
      })
      .catch((err) => console.log("err: ", err));
  };

  const handleListItemClick = (item: any) => {
    //setSelectPosition(item);
    handleUpload(item);
  };

  const handleUpload = useCallback(
    (result: any) => {
      console.log(typeof result.lat, result.lat, typeof result.lon, result.lon);
      onChange([Number(result.lat), Number(result.lon)]);
    },
    [onChange]
  );

  console.log(searchText);

  useEffect(() => {
    if (searchText) {
      handleSearch(searchText);
    } else {
      setListPlace([]);
    }
  }, [searchText]);
  console.log(listPlace);
  return (
    <>
      <div className="flex">
        <div className="flex-1">
          <OutlinedInput
            className="w-full"
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="max-h-48 overflow-y-auto">
        <List component="nav" aria-label="main mailbox folders">
          {listPlace.map((item: any) => (
            <div key={item?.place_id}>
              <ListItem
                button
                onClick={() => {
                  handleListItemClick(item);
                }}
              >
                <ListItemIcon>
                  <GrLocationPin />
                </ListItemIcon>
                <ListItemText primary={item?.display_name} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    </>
  );
};

export default LocationSelect;
