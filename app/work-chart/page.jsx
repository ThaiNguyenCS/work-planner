"use client";
import { useRef, useState } from "react";
import { getDayStr, getOnlyDate } from "../_utils/dateFormat";
import { generateUUIDV4 } from "../_utils/uuidManager";
import styles from "./page.module.css";
import { add, compareAsc, format, getDate, getDay, getMonth, getYear } from "date-fns";

const fakeData = [
    {
        id: "1",
        title: "Clean the room Clean the room Clean the room Clean the room Clean the room Clean the room",
        tag: "A",
        startDate: "2024-10-31",
        endDate: "2024-11-05",
    },
    {
        title: "Clean the room",
        tag: "A",
        startDate: "2024-11-02",
        endDate: "2024-11-08",
    },
    {
        title: "Clean the room",
        tag: "A",
        startDate: "2024-10-31",
        endDate: "2024-11-15",
    },
    {
        title: "Clean the room",
        startDate: "2024-10-31",
        tag: "A",
        endDate: "2024-11-16",
    },
    {
        title: "Clean the room",
        startDate: "2024-10-18",
        tag: "A",
        endDate: "2024-11-23",
    },
];

const startDate = "2024-10-31";
const endDate = "2024-12-01";

const Page = () => {
    const taskTableRef = useRef(null);
    const resizeBarRef = useRef(null);
    const [visibleRange, setVisibleRange] = useState({
        startDate: getOnlyDate(Date.now()),
        endDate: format(
            add(getOnlyDate(Date.now()), {
                months: 1,
            }),
            "yyyy-MM-dd"
        ),
    });

    function mouseMoveHandler(e) {
        // console.log(e.clientX);
        if (taskTableRef.current)
            taskTableRef.current.style.width =
                parseInt(e.clientX) - parseInt(getComputedStyle(resizeBarRef.current).marginLeft) + "px";
    }

    function mouseUpHandler(e) {
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mousemove", mouseUpHandler);
        document.body.style.userSelect = ""; // Reset default text selection style
    }

    function generateProgressTableHeader() {
        let s = new Date(visibleRange.startDate);
        let e = new Date(visibleRange.endDate);
        let arr = [];

        while (compareAsc(s, e) !== 1) {
            console.log(s);

            arr.push({
                date: s,
            });
            s = add(s, {
                days: 1,
            });
        }

        return (
            <>
                <tr>
                    {/* <td>Resizer</td> */}
                    {arr.map((item) => (
                        <td key={generateUUIDV4()}>
                            <div
                                className={`${styles["td-date"]} ${
                                    compareAsc(getOnlyDate(Date.now()), getOnlyDate(item.date)) === 0
                                        ? styles["today"]
                                        : ""
                                } `}
                            >
                                <span>{getDayStr(getDay(item.date))}</span>
                                <span>
                                    {getDate(item.date)}/{getMonth(item.date) + 1}
                                </span>
                            </div>
                        </td>
                    ))}
                </tr>
            </>
        );
    }

    function generateProgressTaskBody(idx) {
        let taskStartDate = getOnlyDate(fakeData[idx].startDate); // task start
        let taskEndDate = getOnlyDate(fakeData[idx].endDate); // task end
        let viewStartDate = visibleRange.startDate;
        let viewEndDate = visibleRange.endDate;
        let arr = [];
        while (compareAsc(viewStartDate, viewEndDate) !== 1) {
            // run a loop from view start date to view end date
            let isMarked = false;
            let isStart = false;
            let isEnd = false;
            if (compareAsc(taskStartDate, viewStartDate) !== 1 && compareAsc(viewStartDate, taskEndDate) !== 1)
                isMarked = true;
            if (compareAsc(taskStartDate, viewStartDate) === 0) isStart = true;
            if (compareAsc(viewStartDate, taskEndDate) === 0) {
                isEnd = true;
            }
            arr.push({
                isMarked,
                isStart,
                isEnd,
            });
            viewStartDate = add(viewStartDate, {
                days: 1,
            });
        }
        return (
            <>
                <tr>
                    {arr.map((item) => (
                        <td>
                            <div
                                className={`${item.isMarked ? styles["td-marked"] : ""}
                            ${item.isStart ? styles["start"] : ""}
                            ${item.isEnd ? styles["end"] : ""}`}
                            ></div>
                        </td>
                    ))}
                </tr>
            </>
        );
    }

    return (
        <>
            <h1>Kế hoạch làm việc</h1>
            <div>Độ chia: ngày, tuần</div>
            <label htmlFor="">Thời gian bắt đầu</label>
            <input
                type="date"
                value={visibleRange?.startDate}
                onChange={(e) => {
                    // console.log(e.target.valueAsDate);
                    const startDate = getOnlyDate(e.target.valueAsDate);
                    if (compareAsc(startDate, visibleRange.endDate) === 1) {
                        console.log("Invalid startdate");
                        return;
                    } else {
                        setVisibleRange((state) => ({ ...state, startDate }));
                    }
                }}
            />
            <label htmlFor="">Thời gian kết thúc</label>
            <input
                type="date"
                onChange={(e) => {
                    // console.log(e.target.valueAsDate);
                    const endDate = getOnlyDate(e.target.valueAsDate);
                    if (compareAsc(endDate, visibleRange.startDate) === -1) {
                        console.log("Invalid endDate");
                        return;
                    } else {
                        setVisibleRange((state) => ({ ...state, endDate }));
                    }
                }}
                value={visibleRange?.endDate}
            />
            <div className={styles["chart-container"]}>
                <table className={styles["task-table"]} style={{ width: "300px" }} ref={taskTableRef}>
                    <thead>
                        <tr>
                            <td>Công việc</td>
                        </tr>
                    </thead>
                    <tbody>
                        {fakeData?.length > 0 &&
                            fakeData.map((item) => (
                                <tr>
                                    <td>{item.title}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <div
                    ref={resizeBarRef}
                    className={styles["resizer"]}
                    onMouseDown={(e) => {
                        document.body.style.userSelect = "none"; // Disable text selection
                        document.addEventListener("mousemove", mouseMoveHandler);
                        document.addEventListener("mouseup", mouseUpHandler);
                    }}
                ></div>
                <div className={styles["scrollable-container"]}>
                    <table className={styles["progress-table"]}>
                        <thead>{generateProgressTableHeader()}</thead>
                        <tbody>{fakeData.map((item, idx) => generateProgressTaskBody(idx))}</tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Page;
