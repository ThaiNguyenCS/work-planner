import styles from "./modify_panel.module.css";
import { IoClose } from "react-icons/io5";
import { TfiTrash } from "react-icons/tfi";
import { RxUpdate } from "react-icons/rx";

const ModifyPanel = (props) => {
    const { panelOpen, setPanelOpen, task } = props;
    return (
        <>
            <div className={`${styles["outer-container"]} ${panelOpen ? styles["expand"] : ""}`}>
                <div className={`${styles["container"]} ${panelOpen ? styles["expand"] : ""}`}>
                    <div
                        className={styles["icon-wrapper"]}
                        style={{ alignSelf: "flex-end", marginBottom: "5px" }}
                        onClick={() => {
                            setPanelOpen(false);
                        }}
                    >
                        <IoClose className={styles["icon"]} />
                    </div>
                    <div className={styles["section"]}>
                        <input className={styles["task-description"]} value={task?.title || "Không có tiêu đề"} />
                    </div>
                    <div className={styles["section"]}>
                        <div style={{ fontSize: "0.9rem" }}>
                            <label>Trạng thái</label>
                            <select name="" id="">
                                <option value="">Chưa làm</option>
                                <option value="">Đang làm</option>
                                <option value="">Hoàn thành</option>
                            </select>
                        </div>
                        <div style={{ fontSize: "0.9rem" }}>
                            <label>Phân loại</label>
                            <select name="" id="">
                                <option value="">User define 1</option>
                                <option value="">User define 2</option>
                                <option value="">User define 3</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles["section"]}>
                        <div style={{ fontSize: "0.9rem" }}>
                            <label>Ngày đến hạn</label>
                            <input type="date" />
                        </div>
                        <div style={{ fontSize: "0.9rem" }}>
                            <label>Nhắc nhở</label>
                            <input type="date" />
                        </div>
                    </div>
                    <div className={styles["action-container"]}>
                        <div className={styles["update-button"]}>
                            <RxUpdate style={{ width: "1rem", height: "1rem" }} />
                            <span>Cập nhật</span>
                        </div>
                        <div className={styles["delete-button"]}>
                            <TfiTrash style={{ width: "1rem", height: "1rem" }} />
                            <span>Xóa</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModifyPanel;
