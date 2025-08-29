import React, {useState} from 'react';
import {Grid} from "@mui/material";
import SidebarMenu from "../components/SidebarMenu.jsx";
import Privacy from "./Privacy.jsx";
import SavedUniversities from "../components/SavedUniversities.jsx";
import MyProfiles from "../components/MyProfiles.jsx";
import FAQ from "../components/FAQ.jsx";
import WhatsNew from "../components/WhatsNew.jsx";
import Help from "../components/Help.jsx";

const Profile = () => {
    const [type, setType] = useState("saved-universities");

    const renderComponent = () => {
        switch (type) {
            case "saved-universities":
                return <SavedUniversities/>;
            case "privacy":
                return <Privacy/>;
            case "my-profiles":
                return <MyProfiles/>;
            case "help":
                return <Help/>;
            case "faq":
                return <FAQ/>;
            case "new":
                return <WhatsNew/>;
            default:
                return <SavedUniversities/>;
        }
    };

    return (
        <Grid container sx={{mt: 4, mb: 4}} spacing={3}>
            <SidebarMenu type={type} setType={setType}/>
            <Grid item xs={12} md={8}>
                {renderComponent()}
            </Grid>
        </Grid>
    );
};

export default Profile;