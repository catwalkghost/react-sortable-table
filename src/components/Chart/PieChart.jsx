import React from 'react';
import propTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { ResponsivePie } from '@nivo/pie';
import { filterDatesByKey, nivoFormatDatesBy } from '../../utils/utils';

const PieChart = ({ data }) => {

    const { chart: { filterDatesBy } } = useSelector(state => state);
    const formattedData = nivoFormatDatesBy(data, filterDatesBy, '/');

    return (
        <div className='pie-chart-container'>
            <div className="row-center-center gaps-h-0x5">
                <span>
                    Filter chart by:
                </span>
                <PieChartDatesButton
                    setting={filterDatesBy}
                    filterBy="day"
                />
                <PieChartDatesButton
                    setting={filterDatesBy}
                    filterBy="month"
                />
                <PieChartDatesButton
                    setting={filterDatesBy}
                    filterBy="year"
                />
            </div>
            <ResponsivePie
                data={formattedData}
                colors={{"scheme": "oranges"}}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
            />
        </div>

    );
}

// eslint-disable-next-line react/prop-types
const PieChartDatesButton = ({ setting, filterBy }) => {

    const dispatch = useDispatch();

    return (
        <button
            className="chart-filter-button"
            type="button"
            disabled={setting === filterBy}
            onClick={() => filterDatesByKey(dispatch, filterBy)}
        >
            {filterBy}
        </button>
    );
}

PieChart.propTypes = {
    data: propTypes.arrayOf(
        propTypes.shape({
            firstName: propTypes.string,
            lastName: propTypes.string,
            dob: propTypes.string,
            income: propTypes.number
        })
    ).isRequired
}

PieChartDatesButton.propTypes = {
    setting: propTypes.string.isRequired,
    filterBy : propTypes.string.isRequired
}

export default PieChart;
