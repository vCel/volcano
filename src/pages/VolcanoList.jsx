import Select from "react-select";
import { useNavigate } from "react-router-dom"
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";

import { GetCountries as CountrySearch, GetVolcanoes } from "../api/volcano_api"

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
    // Get Countries
    const country_filter = CountrySearch();

    const range_filter = [
        {value: 0, label: "Any range"},
        {value: 5, label: "5km"},
        {value: 10, label: "10km"},
        {value: 30, label: "30km"},
        {value: 100, label: "100km"}
    ];

    // Default state of the search
    const defaultSearch= {country: 'Japan', range: 0};

    const countryChange = inputVal => {setSearch({country: inputVal.value, range: search.range})};
    const rangeChange = inputVal => {setSearch({country: search.country, range: inputVal.value})};

    const [search, setSearch] = useState({country: defaultSearch.country.toLowerCase(), range: defaultSearch.range});
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
                        defaultValue={{value: defaultSearch.country.toLowerCase(), label: defaultSearch.country}} 
                        onChange={countryChange}/>
                    </div>
                    <div className="range__sort">
                        Populated Within
                        <Select options={range_filter} 
                        defaultValue={{value:0, label: "Any range"}}
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

// Uses AG Grid to generate a table
const Table = ({search}) => {
    const navigate = useNavigate();
    const [rowData, setRowData] = useState();

    const [columnDefs] = useState([
        { field: 'name', sort: 'asc'},
        { field: 'region'},
        { field: 'subregion'}
    ]);

    useEffect(() => {
        GetVolcanoes(search.country, search.range)
        .then(result => {
            setRowData(result); // Sets the row data of the table
        }).catch(error => console.log(error))
    }, [search.country, search.range]);

    return (
        <div className="ag-theme-alpine" style={{height: 540, width: 600}}>
            <AgGridReact 
            rowData={rowData}
            defaultColDef={{
                sortable: true, 
                suppressMovable: true,
                filter: 'agTextColumnFilter', 
                filterParams: {buttons: ['reset', 'apply']}}} 
            columnDefs={columnDefs} 
            pagination={true} 
            paginationPageSize={10}
            onRowClicked={e => openVolcano(rowData[e.rowIndex], navigate)}/>
        </div>
    );
}

// Opens the page of the volcano
const openVolcano = (selected, navigate) => {
    navigate(`../volcano?id=${selected.id}`)
}


export default VolcanoList;