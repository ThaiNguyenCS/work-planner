import styles from "./item.module.css";
import { TbTrashX } from "react-icons/tb";
import { SlOptionsVertical } from "react-icons/sl";
import Image from "next/image";
import IcEdit from "../../public/ic_edit.svg";
import pageStyles from "./page.module.css";
import { useState } from "react";

const statusMapping = { 0: "Chưa làm", 1: "Đang làm", 2: "Hoàn thành" };

const Item = (props) => {
    const { setPanelOpen } = props;

    function returnStatusStyle() {
        switch (task.status) {
            case 0:
                return pageStyles["not-doing"];
            case 1:
                return pageStyles["doing"];
            case 2:
                return pageStyles["done"];
        }
        return "";
    }

    const { task } = props;
    return (
        <>
            <div className={styles["container"]}>
                <div>
                    <input type="checkbox" />
                    {task.description}
                </div>
                <div>
                    <span className={returnStatusStyle()}>{statusMapping[task.status]}</span>
                </div>
                <div>{task.category || "null category"}</div>
                <div>{task.dueDate}</div>
                <div>
                    <div className={styles["action-container"]}>
                        {/* <div className={styles["icon-wrapper"]}>
                            <TbTrashX className={styles["delete-icon"]} />
                        </div> */}
                        <div
                            className={styles["icon-wrapper"]}
                            onClick={() => {
                                setPanelOpen();
                            }}
                        >
                            <Image height={"16"} width={"16"} src={IcEdit} alt="Edit" />
                        </div>
                        <div className={styles["icon-wrapper"]}>
                            <SlOptionsVertical className={styles["reposition-icon"]} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Item;
