import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input, Row, Col } from 'antd'
import customLabel from '../../../features/utils/CustomLabel'
import { ErrorCheck } from '../Error/ErrorCheck'
import {
    setFMinDistance,
    setFMaxDistance,
    setFMinArea,
    setFMaxArea,
    setErrorMessage
} from '../../../features/filter/OptionReducer'

import './options.css'

const ForestOptions = () => {
    const [enabled, setEnabled] = useState(true)
    const [f_min_distance, set_f_min_distance] = useState('')
    const [f_max_distance, set_f_max_distance] = useState('')
    const [f_min_area, set_f_min_area] = useState('')
    const [f_max_area, set_f_max_area] = useState('')

    const dispatch = useDispatch()

    const onChangeFMinDistance = e => {
        const value = e.target.value
        dispatch(setFMinDistance(value))
        set_f_min_distance(value)
    }
    const onChangeFMaxDistance = e => {
        const value = e.target.value
        dispatch(setFMaxDistance(value))
        set_f_max_distance(value)
    }
    const onChangeFMinArea = e => {
        const value = e.target.value
        dispatch(setFMinArea(value))
        set_f_min_area(value)
    }
    const onChangeFMaxArea = e => {
        const value = e.target.value
        dispatch(setFMaxArea(value))
        set_f_max_area(value)
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
                        <span className='option-title'>Distance</span>
                    </Col>
                    <Col xs={18}>
                        <Row gutter={[6]}>
                            {/* <Col xs={12}>
                                <Form.Item
                                    label={customLabel('Min Distance', true, null, enabled)}
                                    name="F_Min_Distance"
                                    rules={[{ required: false }]}
                                >
                                    <Input
                                        type='number'
                                        onChange={onChangeFMinDistance}
                                        placeholder="0.0"
                                        suffix={'Km'}
                                        disabled={!enabled}
                                        value={f_min_distance}
                                    />
                                </Form.Item>
                            </Col> */}
                            <Col xs={12}>
                                <Form.Item
                                    label={customLabel('Distance', true, null, enabled)}
                                    name="F_Max_Distance"
                                    rules={[{ required: false }]}
                                >
                                    <Input
                                        type='number'
                                        onChange={onChangeFMaxDistance}
                                        placeholder="0.0"
                                        suffix={'Km'}
                                        disabled={!enabled}
                                        value={f_max_distance}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={[6]}>
                    <Col xs={6}>
                        <span className='option-title'>Area</span>
                    </Col>
                    <Col xs={18}>
                        <Row gutter={[6]}>
                            <Col xs={12}>
                                <Form.Item
                                    label={customLabel('Min Area', true, null, enabled)}
                                    name="F_Min_Area"
                                    rules={[{ required: false }]}
                                >
                                    <Input
                                        type='number'
                                        onChange={onChangeFMinArea}
                                        placeholder="0.0"
                                        suffix={'ha'}
                                        disabled={!enabled}
                                        value={f_min_area}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={12}>
                                <Form.Item
                                    label={customLabel('Max Area', true, null, enabled)}
                                    name="F_Max_Area"
                                    rules={[{ required: false }]}
                                >
                                    <Input
                                        type='number'
                                        onChange={onChangeFMaxArea}
                                        placeholder="0.0"
                                        suffix={'ha'}
                                        disabled={!enabled}
                                        value={f_max_area}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    )
}


export default ForestOptions