import * as React from "react";
import {
    AppNavBar,
    setItemActive
} from "baseui/app-nav-bar";
import {
    ChevronDown,
    Delete,
    Upload
} from "baseui/icon";
import { StyledLink } from "baseui/link";
import { Link } from "react-router-dom";

export default () => {
    const [mainItems, setMainItems] = React.useState([
        { icon: Upload, label: "Fork Project" },
        {
            icon: ChevronDown,
            label: "Star Project",
            navExitIcon: Delete,
        }
    ]);
    return (
        <AppNavBar
            title={<Link to="/"><StyledLink>Star wars</StyledLink></Link>}
            mainItems={mainItems}
            onMainItemSelect={item => {}}
            onUserItemSelect={item => console.log(item)}
        />
    );
}