import { useState, useEffect } from "react";
import { TableParticulars } from "../../../../../src/components/index";
import { useTranslation } from "react-i18next";
import useProcPlanning from "../../../../VectorFlow/Pages/MTO/Procurement/Planning/useProcPlanning";
const ProcPlanningAnalytics = ({ themeUi }: any) => {
    const { fetchData, date } = useProcPlanning("");
    const { t } = useTranslation();
    const [pcs, setPcs] = useState(false);
    const [counts, setCounts] = useState({
        short: 0,
        complete: 0,
        total: 0,
    });
    useEffect(() => {
        const shortCount = localStorage.getItem("shortCount");
        const completeCount = localStorage.getItem("completeCount");
        const totalCount = localStorage.getItem("totalCount");

        setCounts({
            short: shortCount ? JSON.parse(shortCount) : 0,
            complete: completeCount ? JSON.parse(completeCount) : 0,
            total: totalCount ? JSON.parse(totalCount) : 0,
        });

        if (date !== null) {
            fetchData(date);
        }
    }, [fetchData, date]);
    const listTitle = [
        t("ProcPlanning.Analytics")
    ];
    const listData = [
        {
            name: t("ProcPlanning.cntshort"),
            column1: counts.short,
        },
        {
            name: t("ProcPlanning.cntfa"),
            column1: counts.complete,
        },
    ];
    const total = {
        name: t("ProcPlanning.total"),
        column1: counts.total,
    };

    return (
        <>
            <TableParticulars
                themeUi={themeUi}
                listTitle={listTitle}
                listData={listData}
                totalData={total}
                pathname=""
                pcs={pcs}
                setPcs={setPcs}
            />
        </>
    );
};

export default ProcPlanningAnalytics;
