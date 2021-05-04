import * as React from "react";
import {
    AppNavBar,
} from "baseui/app-nav-bar";
import {
    ChevronDown,
    Delete,
    Icon,
    Upload
} from "baseui/icon";
import { StyledLink } from "baseui/link";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../App";

const BulbSvg = ({color = "#000000"}: {color?: string}) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <g transform="matrix( 1 0 0 1 4 1 )">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3999 11C15.7999 10.1 16 9 16 8C16 3.6 12.4 0 8 0C3.6 0 0 3.6 0 8C0 9.1 0.200098 10.1 0.600098 11L2.19995 15L13.8 15L15.3999 11ZM11 22L12.6001 18L3.3999 18L5 22L11 22Z" fill={color} opacity="1">
            </path>
            </g>
        </svg>
    )
}
export default () => {
    const [mainItems, setMainItems] = React.useState([
        { icon: Upload, label: "Fork Project" },
        {
            icon: ChevronDown,
            label: "Star Project",
            navExitIcon: Delete,
        },
        {   hideLabel: true,
            label: "toggleTheme"
        }
    ]);
    const {setTheme, theme} = useContext(GlobalContext);
    return (
        <AppNavBar
            title={<Link to="/"><StyledLink>Star wars</StyledLink></Link>}
            mainItems={mainItems}
            onMainItemSelect={({label}) => {
                if(label === "toggleTheme") setTheme(theme === "light" ? "dark" : "light");
            }}
            mapItemToNode={(item) => item.label === "toggleTheme" ? <Icon overrides={{Svg: {component: () => <BulbSvg color={theme === "dark" ? "#ffffff": undefined}/>}}}/> : item.label}
        />
    );
}