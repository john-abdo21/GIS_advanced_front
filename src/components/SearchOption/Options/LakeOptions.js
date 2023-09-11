import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input, Row, Col } from 'antd'
import customLabel from '../../../features/utils/CustomLabel'
import { ErrorCheck } from '../Error/ErrorCheck'
import {
    setIMinDistance,
    setIMaxDistance,
    setIMinArea,
    setIMaxArea,
    setErrorMessage
} from '../../../features/filter/OptionReducer'

import './options.css'

const LakeOptions = () => {
    const [enabled, setEnabled] = useState(true)
    const [i_min_distance, set_i_min_distance] = useState('')
    const [i_max_distance, set_i_max_distance] = useState('')
    const [i_min_area, set_i_min_area] = useState('')
    const [i_max_area, set_i_max_area] = useState('')

    const dispatch = useDispatch()

    const onChangeIMinDistance = e => {
        const value = e.target.value
        dispatch(setIMinDistance(value))
        set_i_min_distance(value)
    }
    const onChangeIMaxDistance = e => {
        const value = e.target.value
        dispatch(setIMaxDistance(value))
        set_i_max_distance(value)
    }
    const onChangeIMinArea = e => {
        const value = e.target.value
        dispatch(setIMinArea(value))
        set_i_min_area(value)
    }
    const onChangeIMaxArea = e => {
        const value = e.target.value
        dispatch(setIMaxArea(value))
        set_i_max_area(value)
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
                                    name="I_Min_Distance"
                                    rules={[{ required: false }]}
                                >
                                    <Input
                                        type='number'
                                        onChange={onChangeIMinDistance}
                                        placeholder="0.0"
                                        suffix={'Km'}
                                        disabled={!enabled}
                                        value={i_min_distance}
                                    />
                                </Form.Item>
                            </Col> */}
                            <Col xs={12}>
                                <Form.Item
                                    label={customLabel('Distance', true, null, enabled)}
                                    name="I_Max_Distance"
                                    rules={[{ required: false }]}
                                >
                                    <Input
                                        type='number'
                                        onChange={onChangeIMaxDistance}
                                        placeholder="0.0"
                                        suffix={'Km'}
                                        disabled={!enabled}
                                        value={i_max_distance}
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
                                    name="I_Min_Area"
                                    rules={[{ required: false }]}
                                >
                                    <Input
                                        type='number'
                                        onChange={onChangeIMinArea}
                                        placeholder="0.0"
                                        suffix={'ha'}
                                        disabled={!enabled}
                                        value={i_min_area}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={12}>
                                <Form.Item
                                    label={customLabel('Max Area', true, null, enabled)}
                                    name="I_Max_Area"
                                    rules={[{ required: false }]}
                                >
                                    <Input
                                        type='number'
                                        onChange={onChangeIMaxArea}
                                        placeholder="0.0"
                                        suffix={'ha'}
                                        disabled={!enabled}
                                        value={i_max_area}
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


export default LakeOptions