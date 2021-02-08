import React, {Component, useEffect, useState, useRef} from 'react'
import {serverApi} from '../api';
import Loader from './Loader';
import {BootstrapTable, TableHeaderColumn} 
        from 'react-bootstrap-table-next';

const Table = (    
    condition
) => {
    const defaultSorted = [{
        dataField: 'datetime',
        order: 'desc'
      }];
    
    const tableSelf = useRef(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setTable(condition);
    }, [condition])

    const setTable = async (condition) => {
        const table = undefined;
        try {
            setLoading(true);
            table = await serverApi.getInfoTable();
            tableSelf.current = 
        }
        catch (error){
            setError(error);
            console.log(error);
        }
        finally{
            setLoading(true);
        }        

    }
    return (<>
        {loading ? (<Loader />) : (
            <BootstrapTable 
            keyField='datetime'
            defaultSorted={defaultSorted}
            striped
            hover
        />
        )}
            
        </>
    )
}
export default Table