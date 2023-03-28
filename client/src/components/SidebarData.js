import React from "react"
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import * as RiIcons from "react-icons/ri"

export const SidebarData = [
    {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        // subNav: [
        //     {
        //         title: "Our Aim",
        //         path: "/about-us/aim",
        //         icon: <IoIcons.IoIosPaper />,
        //     },
        //     {
        //         title: "Our Vision",
        //         path: "/about-us/vision",
        //         icon: <IoIcons.IoIosPaper />,
        //     },
        // ],
    },
    {
        title: "Bloggs",
        path: "/bloggs",
        icon: <IoIcons.IoIosPaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        // subNav: [
        //     {
        //         title: "Service 1",
        //         path: "/services/services1",
        //         icon: <IoIcons.IoIosPaper />,
        //         cName: "sub-nav",
        //     },
        //     {
        //         title: "Service 2",
        //         path: "/services/services2",
        //         icon: <IoIcons.IoIosPaper />,
        //         cName: "sub-nav",
        //     },
        //     {
        //         title: "Service 3",
        //         path: "/services/services3",
        //         icon: <IoIcons.IoIosPaper />,
        //     },
        // ],
    },

    {
        title: "Network",
        path: "/network",
        icon: <FaIcons.FaUserFriends />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    },
    //     {
    //         title: "Contact",
    //         path: "/contact",
    //         icon: <FaIcons.FaPhone />,
    //     },
    //     {
    //         title: "Events",
    //         path: "/events",
    //         icon: <FaIcons.FaEnvelopeOpenText />,

    //         iconClosed: <RiIcons.RiArrowDownSFill />,
    //         iconOpened: <RiIcons.RiArrowUpSFill />,

    //         subNav: [
    //             {
    //                 title: "Event 1",
    //                 path: "/events/events1",
    //                 icon: <IoIcons.IoIosPaper />,
    //             },
    //             {
    //                 title: "Event 2",
    //                 path: "/events/events2",
    //                 icon: <IoIcons.IoIosPaper />,
    //             },
    //         ],
    //     },
    {
        title: "Admin",
        path: "/admin",
        icon: <IoIcons.IoIosAmericanFootball />,
    }
]
