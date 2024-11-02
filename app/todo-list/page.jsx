"use client";
import styles from "./page.module.css";
import { useState } from "react";
import { FaFilter } from "react-icons/fa6";
import Item from "./item";
import Image from "next/image";
import IcTick from "../../public/ic_tick.svg";
import ModifyPanel from "./modify_panel";

const fakeTasks = [
    {
        id: "1",
        description: "Làm BTL MMT",
        status: 1,
        dueDate: "2024-10-07T00:00:00Z",
    },
    {
        id: "2",
        description: "Làm BTL MMT",
        status: 2,
        dueDate: "2024-10-07T00:00:00Z",
    },
    {
        id: "3",
        description: "Làm BTL MMT",
        status: 1,
        dueDate: "2024-10-07T00:00:00Z",
    },
    {
        id: "4",
        description: "Làm BTL MMT",
        status: 1,
        dueDate: "2024-10-07T00:00:00Z",
    },
    {
        id: "5",
        description: "Làm BTL MMT",
        status: 2,
        dueDate: "2024-10-07T00:00:00Z",
    },
    {
        id: "6",
        description: "Làm BTL MMT",
        status: 1,
        dueDate: "2024-10-07T00:00:00Z",
    },
    {
        id: "7",
        description: "Làm BTL MMT",
        status: 0,
        dueDate: "2024-10-07T00:00:00Z",
    },
    {
        id: "8",
        description: "Làm BTL MMT",
        status: 1,
        dueDate: "2024-10-07T00:00:00Z",
    },
    {
        id: "9",
        description: "Làm BTL MMT",
        status: 0,
        dueDate: "2024-10-07T00:00:00Z",
    },
    {
        id: "10",
        description: "Làm BTL MMT",
        status: 1,
        dueDate: "2024-10-07T00:00:00Z",
    },
];

const Page = () => {
    const [tasks, setTasks] = useState(fakeTasks);
    const [filterDropMenu, setFilterDropMenu] = useState(false);
    const [modifyPanelOpen, setModifyPanelOpen] = useState(false);

    function handleModifyPanelOpen (task)   {
        setModifyPanelOpen(true)
    }

    return (
        <>
            <div className={styles["container"]}>
                <h1>Việc cần làm</h1>
                <div>Chúc mừng, hôm nay bạn đã hoàn thành 10 nhiệm vụ!</div>
                <div className={styles["action-container"]}>
                    <div
                        className={styles["custom-select"]}
                        onClick={() => {
                            setFilterDropMenu((state) => !state);
                        }}
                    >
                        <span>Bộ lọc</span>
                        <div className={styles["icon-wrapper"]}>
                            <FaFilter className={styles["icon"]} />
                        </div>
                        <div className={`${styles["filter-drop-menu"]} ${filterDropMenu ? styles["visible"] : ""}`}>
                            <div className={styles["filter-label"]}>Theo trạng thái</div>
                            <ul>
                                <li className={styles["selected"]}>
                                    <Image src={IcTick} width={12} height={12} alt="" />
                                    Chưa làm
                                </li>
                                <li>
                                    <Image src={IcTick} width={12} height={12} alt="" />
                                    Đang làm
                                </li>
                                <li>
                                    <Image src={IcTick} width={12} height={12} alt="" />
                                    Hoàn thành
                                </li>
                            </ul>
                            <div className={styles["filter-label"]}>Theo ngày</div>
                            <ul>
                                <li>
                                    <Image src={IcTick} width={12} height={12} alt="" />
                                    Hôm nay
                                </li>
                                <li>
                                    <Image src={IcTick} width={12} height={12} alt="" />
                                    10 ngày tới
                                </li>
                                <li>
                                    <Image src={IcTick} width={12} height={12} alt="" />
                                    Tất cả
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles["task-header"]}>
                    <div className={styles["header-item"]}>
                        <span>Mô tả</span>
                    </div>
                    <div className={styles["header-item"]}>
                        <span>Trạng thái</span>
                    </div>

                    <div className={styles["header-item"]}>
                        <span>Phân loại</span>
                    </div>
                    <div className={styles["header-item"]}>
                        <span>Ngày đến hạn</span>
                    </div>
                    <div className={styles["header-item"]}>
                        <span></span>
                    </div>
                </div>
                <div className={styles["task-container"]}>
                    {tasks.length > 0 && tasks.map((task) => <Item setPanelOpen={handleModifyPanelOpen} task={task} />)}
                </div>
            </div>
            <ModifyPanel panelOpen={modifyPanelOpen} setPanelOpen={setModifyPanelOpen} />
        </>
    );
};

export default Page;
