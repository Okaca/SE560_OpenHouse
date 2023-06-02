import React, { useCallback, useState } from "react";
import {
  OutlinedInput,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
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

  const handleSearch = () => {
    const params = {
      q: searchText,
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
      onChange([result.lat, result.lon]);
    },
    [onChange]
  );

  return (
    <>
      <div className="flex">
        <div className="flex-1">
          <OutlinedInput
            className="w-5/6"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>
        <div className="flex items-center px-15">
          <Button
            variant="contained"
            color="primary"
            className="rounded-full px-3 py-2"
            onClick={handleSearch}
          >
            Ara
          </Button>
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
