import { useState, useEffect } from "react";
import { Outlet, Link as RouterLink, useLocation } from "react-router-dom";

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
                setActiveTab("Group Rolls");
                break;
            case "stat-set":
                setActiveTab("StatSet");
                break;
            default:
                setActiveTab("Criticals");
        }
    }, [pathname]);

    return (
        <nav>
            <div className="row-wrap-center-center">
                <ul className="row-wrap-center-center sm-margin-top">
                    <RouterLink to="/dnd_assistant">
                        <li
                            onClick={() => setActiveTab("Criticals")}
                            className={
                                activeTab === "Criticals" ? "active-li" : ""
                            }
                        >
                            Criticals
                        </li>
                    </RouterLink>

                    <RouterLink to="/dnd_assistant/find-magic-items">
                        <li
                            onClick={() => setActiveTab("Items")}
                            className={
                                activeTab === "Items"
                                    ? "active-li vsm-margin-left"
                                    : "vsm-margin-left"
                            }
                        >
                            Find Magic Items
                        </li>
                    </RouterLink>

                    <RouterLink to="/dnd_assistant/group-rolls">
                        <li
                            onClick={() => setActiveTab("Group Rolls")}
                            className={
                                activeTab === "Group Rolls"
                                    ? "active-li vsm-margin-left"
                                    : "vsm-margin-left"
                            }
                        >
                            Group Rolls
                        </li>
                    </RouterLink>

                    <RouterLink to="/dnd_assistant/stat-set">
                        <li
                            onClick={() => setActiveTab("StatSet")}
                            className={
                                activeTab === "StatSet"
                                    ? "active-li vsm-margin-left"
                                    : "vsm-margin-left"
                            }
                        >
                            Stat Set
                        </li>
                    </RouterLink>
                </ul>
            </div>
            <Outlet />
        </nav>
    );
}

export default NavTabs;
