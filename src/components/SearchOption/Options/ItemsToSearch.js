import React, { useState } from 'react'
import { Row, Col, Input, Form } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import customLabel from '../../../features/utils/CustomLabel'
import { ErrorCheck } from '../Error/ErrorCheck'
import {
    setLMinArea,
    setLMaxArea,
    setLMinAed,
    setLMaxAed,
    setErrorMessage
} from '../../../features/filter/OptionReducer'

import './options.css'

const ItemsToSearch = () => {

    const [enabled, setEnabled] = useState(true)
    const [l_min_area, set_l_min_area] = useState('')
    const [l_max_area, set_l_max_area] = useState('')
    const [l_min_aed, set_l_min_aed] = useState('')
    const [l_max_aed, set_l_max_aed] = useState('')

    const dispatch = useDispatch();

    const onChangeLMinArea = e => {
        const value = e.target.value
        dispatch(setLMinArea(value))
        set_l_min_area(value)
    }
    const onChangeLMaxArea = e => {
        const value = e.target.value
        dispatch(setLMaxArea(value))
        set_l_max_area(value)
    }
    const onChangeLMinAED = e => {
        const value = e.target.value
        dispatch(setLMinAed(value))
        set_l_min_aed(value)
    }
    const onChangeLMaxAED = e => {
        const value = e.target.value
        dispatch(setLMaxAed(value))
        set_l_max_aed(value)
    }

    const options = useSelector(state => state, [])
    dispatch(setErrorMessage(ErrorCheck(options)))

    return (
        <>
            <div
                style={{
                    paddingLeft: 24,
                }}
            >
                <Row gutter={[6]}>
                    <Col xs={6}>
                        <span className='option-title'>Land Area</span>
                    </Col>
                    <Col xs={18}>
                        <Row gutter={[6]}>
                            <Col xs={12}>
                                <Form.Item
                                    label={customLabel('Min Area', true, null, enabled)}
                                    name="L_Min_Area"
                                    rules={[{ required: false }]}
                                >
                                    <Input
                                        type='number'
                                        onChange={onChangeLMinArea}
                                        placeholder="0.0"
                                        suffix={'ha'}
                                        disabled={!enabled}
                                        value={l_min_area}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={12}>
                                <Form.Item
                                    label={customLabel('Max Area', true, null, enabled)}
                                    name="L_Max_Area"
                                    rules={[{ required: false }]}
                                >
                                    <Input
                                        type='number'
                                        onChange={onChangeLMaxArea}
                                        placeholder="0.0"
                                        suffix={'ha'}
                                        disabled={!enabled}
                                        value={l_max_area}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={[6]}>
                    <Col xs={6}>
                        <span className='option-title'>Average Elevation Diff(AED)</span>
                    </Col>
                    <Col xs={18}>
                        <Row gutter={[6]}>
                            <Col xs={12}>
                                <Form.Item
                                    label={customLabel('Min AED', true, null, enabled)}
                                    name="L_Min_AED"
                                    rules={[{ required: false },]}
                                >
                                    <Input
                                        type='number'
                                        onChange={onChangeLMinAED}
                                        placeholder="0.0"
                                        suffix={'m'}
                                        disabled={!enabled}
                                        value={l_min_aed}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={12}>
                                <Form.Item
                                    label={customLabel('Max AED', true, null, enabled)}
                                    name="L_Max_AED"
                                    rules={[{ required: false }]}
                                >
                                    <Input
                                        type='number'
                                        onChange={onChangeLMaxAED}
                                        placeholder="0.0"
                                        suffix={'m'}
                                        disabled={!enabled}
                                        value={l_max_aed}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default ItemsToSearch