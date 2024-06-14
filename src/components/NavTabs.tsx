import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

/**
 *
 * @returns A navigation bar with links to the Criticals, Find Magic Items, Group Rolls, and Stat Set pages.
 */
function NavTabs() {
    const [activeTab, setActiveTab] = useState("Criticals");
    const { pathname } = useLocation();

    useEffect(() => {
        let tabAppNameIndex = pathname.indexOf("/dnd_assistant") + 15;
        let tabName = pathname.slice(tabAppNameIndex);

        switch (tabName) {
            case "find-magic-items":
                setActiveTab("Items");
                break;
            case "group-rolls":
                setActiveTab("GroupRolls");
                break;
            case "stat-set":
                setActiveTab("StatSet");
                break;
            default:
                setActiveTab("Criticals");
        }
    }, [pathname]);

    return (
        <nav className="vsm-margin-top">
            <div className="row-wrap-center-center">
                <div
                    className={
                        activeTab === "Criticals"
                            ? "nav-tabs active-tab"
                            : "nav-tabs"
                    }
                >
                    <Link to="/dnd_assistant">Criticals</Link>
                </div>
                <div
                    className={
                        activeTab === "Items"
                            ? "nav-tabs vsm-margin-left active-tab"
                            : "nav-tabs vsm-margin-left"
                    }
                >
                    <Link to="/dnd_assistant/find-magic-items">
                        Find Magic Items
                    </Link>
                </div>
                <div
                    className={
                        activeTab === "GroupRolls"
                            ? "nav-tabs vsm-margin-left active-tab"
                            : "nav-tabs vsm-margin-left"
                    }
                >
                    <Link to="/dnd_assistant/group-rolls">Group Rolls</Link>
                </div>
                <div
                    className={
                        activeTab === "StatSet"
                            ? "nav-tabs vsm-margin-left active-tab"
                            : "nav-tabs vsm-margin-left"
                    }
                >
                    <Link to="/dnd_assistant/stat-set">Stat Set</Link>
                </div>
            </div>

            <Outlet />
        </nav>
    );
}

export default NavTabs;
