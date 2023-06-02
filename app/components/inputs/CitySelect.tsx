"use client";

import useCities from "@/app/hooks/useCities";
import Select from "react-select";

export type CitySelectValue = {
  id: number;
  name: string;
  latlng: number[];
  region: string;
};

interface CitySelectProps {
  value?: CitySelectValue;
  onChange: (value: CitySelectValue) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCities();

  return (
    <div>
      <Select
        placeholder="Şehir"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CitySelectValue)}
        isSearchable={true}
        formatOptionLabel={(option: any) => (
          <div
            className="
              flex flex-row items-center gap-3"
          >
            <div>{option.id}</div>
            <div>
              {option.name},
              <span className="text-neutral-500 ml-3">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CitySelect;
