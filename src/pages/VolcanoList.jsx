import Select from "react-select";
import { useNavigate } from "react-router-dom"
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";

import { GetCountries as Filtering, GetVolcanoes } from "../api/volcano_api"

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function VolcanoList() {
    return (
        <div>
            <TableList/>
        </div>
    );
}

function TableList() {
    const country_filter = Filtering();

    const range_filter = [
        {value: 5, label: "5km"},
        {value: 10, label: "10km"},
        {value: 30, label: "30km"},
        {value: 100, label: "100km"}
    ];

    const countryChange = inputVal => {setSearch({country: inputVal.value, range: search.range})};
    const rangeChange = inputVal => {setSearch({country: search.country, range: inputVal.value})};

    const [search, setSearch] = useState({country: "japan", range: 100});

    return (
        <div className="volcanoes__list">
            <h1 className="volcanoes__list__title">Volcanoes</h1>
            <div className="volcanoes__list__container">
                <div className="volcanoes__list__filter">
                    <h2>Search Volcanoes</h2>

                    <div className="country__sort">
                        Country
                        <Select 
                        options={country_filter} 
                        defaultValue={{value: "japan", label: "Japan"}} 
                        onChange={countryChange}/>
                    </div>
                    <div className="range__sort">
                        Populated Within
                        <Select options={range_filter} 
                        defaultValue={{value:100, label: "100km"}}
                        onChange={rangeChange}/>
                    </div>
                </div>
                <div className="volcanoes__list__data">
                    <div className="volcanoes__list__table">
                        <Table search={search}/>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

const Table = ({search}) => {
    const navigate = useNavigate();
    const [rowData, setRowData] = useState();

    const [columnDefs] = useState([
        { field: 'name'},
        { field: 'region'},
        { field: 'subregion'}
    ]);

    useEffect(() => {
        GetVolcanoes(search.country, search.range)
        .then(result => {
            setRowData(result);
        }).catch(error => console.log(error))
    }, [search.country, search.range]);

    return (
        <div className="ag-theme-alpine" style={{height: 500, width: 600}}>
            <AgGridReact 
            rowData={rowData} 
            columnDefs={columnDefs} 
            pagination={true} 
            paginationPageSize={10}
            onRowClicked={e => openVolcano(rowData[e.rowIndex], navigate)}/>
        </div>
    );
}

const openVolcano = (selected, navigate) => {
    navigate(`../volcano?id=${selected.id}`)
}


export default VolcanoList;