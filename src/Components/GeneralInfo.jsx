import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useUserContext } from "../context/UserContext";
import { UpdateContactInfo } from "../mutations";
import { UserContactInfo } from "../queries";
import { useMutation, useQuery } from "@apollo/client";
import Select from "@material-ui/core/Select";
import { Countries } from "../queries";
import { MenuItem } from "@material-ui/core";

const useStyle = makeStyles({
  generalInfo: {
    padding: 0,
  },
  sectionTitle: {
    padding: 30,
  },

  formRow: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 40px",
  },

  label: {
    fontSize: 25,
  },
});

const contactInfo = ["Email", "Phone", "Website", "City", "Avatar"];
const about = "test about";

export default function GeneralInfo() {
  const style = useStyle();
  const { user } = useUserContext();

  const [generalInfo, setGeneralInfo] = useState({
    Email: "",
    Phone: "",
    Website: "",
    City: "",
    Country: -1,
    Avatar: "",
  });
  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState(generalInfo.Country);

  const [updateContactInfo, { data: contactInfoData }] = useMutation(
    UpdateContactInfo
  );

  const { data: querriedContactInfo } = useQuery(UserContactInfo, {
    variables: {
      id: user.id,
    },
    fetchPolicy: "network-only",
    onCompleted: () => {
      const {
        about,
        avatarUrl,
        city,
        country,
        email,
        phone,
        website,
      } = querriedContactInfo.user.contactInfo;

      const auxContactInfo = {
        Email: email,
        Phone: phone,
        Website: website,
        City: city,
        Country: country.id,
        Avatar: avatarUrl,
      };

      setGeneralInfo(auxContactInfo);
    },
  });

  const { data: querriedCountries } = useQuery(Countries, {
    onCompleted: () => {
      setCountries(querriedCountries.counties);
    },
  });

  const handleGeneralInfoSubmit = (event) => {
    event.preventDefault();
    updateContactInfo({
      variables: {
        email: generalInfo.Email,
        phone: generalInfo.Phone,
        city: generalInfo.City,
        website: generalInfo.Website,
        avatarUrl: generalInfo.Avatar,
        about: about,
        countryId: countryId,
        id: user.contactInfoId,
      },
    });
  };

  const handleChange = (event) => {
    setGeneralInfo({
      ...generalInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleCountryChange = (event) => {
    setCountryId(event.target.value);
  };

  console.log(generalInfo);
  return (
    <>
      <h1 className={style.sectionTitle}>General Info</h1>
      <form className={style.generalInfo} onSubmit={handleGeneralInfoSubmit}>
        {generalInfo &&
          contactInfo.map((item) => (
            <div className={style.formRow} key={item}>
              <label className={style.label}>{item}</label>
              <TextField
                variant="outlined"
                margin="normal"
                required
                name={item}
                autoComplete="off"
                autoFocus
                onChange={handleChange}
                defaultValue={generalInfo[item]}
              />
            </div>
          ))}
        {countries && generalInfo && (
          <div className={style.formRow}>
            <label className={style.label}>Country</label>
            <Select
              className={style.dropdown}
              value={countryId > 0 ? countryId : generalInfo.Country}
              onChange={handleCountryChange}
            >
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </div>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          id="submit"
        >
          Save changes
        </Button>
      </form>
    </>
  );
}
