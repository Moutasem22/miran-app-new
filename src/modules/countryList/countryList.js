import React, { useEffect, useRef, useState, } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getList, addToList, editToList } from '../../store/countrySlice'
import { Table, Button } from "antd";
import Api from '../../network'
import AddEditCountry from '../addEditCountry/addEditCountry'

const CountyList = (props) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [countriesList, setCountriesList] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [rowIndex, setRowIndex] = useState(null);
    const [imgSrc, setImgSrc] = useState(null);
    const modalRef = useRef(null);

    const countries = useSelector((state) => state.CountyList.countries)
    const dispatch = useDispatch();

    useEffect(() => {
        setCountriesList(countries)
    }, [countries])

    useEffect(() => {
        Api.get('rest/v2/all').then(res => {
            dispatch(getList(res.data));
            // setCountriesList(res.data);
        })
    }, []);

    const addRecord = (values, imgUrl) => {
        let body = {
            name: values.name,
            capital: values.capital,
            flag: imgUrl,
            region: values.region,
            population: values.population,
        }

        if (isEdit) {
            dispatch(editToList({ body, rowIndex }));
            setModalVisible(false)
            setIsEdit(false)
            setRowIndex(null)
        }
        else dispatch(addToList(body))
    }

    const getItemToEdit = (values, rowIndex) => {
        setModalVisible(true)
        setIsEdit(true)
        setImgSrc(values.flag)
        setRowIndex(rowIndex)
        setTimeout(() => {
            modalRef.current.formRef.current.setFieldsValue({
                name: values.name,
                capital: values.capital,
                region: values.region,
                population: values.population,
            })
        }, 500)

    }

    return (
        <div className="app-page-wrapper">
            <div className="app-page-header table__header">
                <h2>Countries</h2>
                <div>
                    <Button size="large" style={{ margin: '0 8px' }} className="" type="primary" onClick={() => setModalVisible(true)}>
                        Add new Country
                    </Button>
                </div>
            </div>
            <div className="site-layout-background section-indent-wrapper" style={{ padding: '24px 24px 0', height: 'calc(100vh - 110px)', overflow: 'auto', }}>
                {isModalVisible && <AddEditCountry imgSrc={imgSrc} ref={modalRef} addRecord={(values, imgUrl) => { addRecord(values, imgUrl) }} closeModal={() => setModalVisible(false)} />}

                <Table
                    className="table-roles-wrapper app-table-wrapper" scroll={{ y: 'calc(100vh - 275px)' }} 
                    columns={[
                        {
                            title: `Country name`,
                            dataIndex: 'name',
                        },
                        {
                            title: `Capital`,
                            dataIndex: 'capital',
                        },
                        {
                            title: `Country flag`,
                            dataIndex: 'flag',
                            render: falg => (
                                <>
                                    <img width="50px" src={falg} />
                                </>
                            )
                        },
                        {
                            title: `Region`,
                            dataIndex: 'region',
                        },
                        {
                            title: `Population`,
                            dataIndex: 'population',
                        },
                    ]}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {
                                getItemToEdit(record, rowIndex)
                            },
                        };
                    }} dataSource={countriesList} pagination={{ pageSize: 25 }}
                />
            </div>
        </div>
    )
}

// const mapStateToProps = (state) => {
//     return {
//         currentResource: state.common.currentResource,
//         projectActiveItem: state.common.projectActiveItem
//     }
// }connect(mapStateToProps)(
export default CountyList
