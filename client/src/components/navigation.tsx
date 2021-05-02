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

export default () => {
    const [mainItems, setMainItems] = React.useState([
        { icon: Upload, label: "Main A" },
        {
            active: true,
            icon: ChevronDown,
            label: "Main B",
            navExitIcon: Delete,
        }
    ]);
    return (
        <AppNavBar
            title="Star Wars Viewer"
            mainItems={mainItems}
            onMainItemSelect={item => {
                // setMainItems(prev => setItemActive(prev, item));
            }}
            onUserItemSelect={item => console.log(item)}
        />
    );
}