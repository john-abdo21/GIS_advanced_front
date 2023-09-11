import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input, Row, Col } from 'antd'
import customLabel from '../../../features/utils/CustomLabel'
import { ErrorCheck } from '../Error/ErrorCheck'
import {
    setRMinDistance,
    setRMaxDistance,
    setRMinLength,
    setRMaxLength,
    setRMinWidth,
    setRMaxWidth,
    setErrorMessage,
} from '../../../features/filter/OptionReducer'

import './options.css'

const RiverOptions = () => {
    const options = useSelector(state => state, [])
    const options_real = useSelector(state => state.options)

    const [enabled, setEnabled] = useState(true)
    const [r_min_distance, set_r_min_distance] = useState(options_real.options.river.minDistance)
    const [r_max_distance, set_r_max_distance] = useState(options_real.options.river.maxDistance)
    const [r_min_length, set_r_min_length] = useState(options_real.options.river.minLength)
    const [r_max_length, set_r_max_length] = useState(options_real.options.river.maxLength)
    const [r_min_width, set_r_min_width] = useState(options_real.options.river.minWidth)
    const [r_max_width, set_r_max_width] = useState(options_real.options.river.maxWidth)

    const dispatch = useDispatch()

    const onChangeRMinDistance = e => {
        const value = e.target.value
        dispatch(setRMinDistance(value))
        set_r_min_distance(value)
    }
    const onChangeRMaxDistance = e => {
        const value = e.target.value
        dispatch(setRMaxDistance(value))
        set_r_max_distance(value)
    }
    const onChangeRMinLength = e => {
        const value = e.target.value
        dispatch(setRMinLength(value))
        set_r_min_length(value)
    }
    const onChangeRMaxLength = e => {
        const value = e.target.value
        dispatch(setRMaxLength(value))
        set_r_max_length(value)
    }
    const onChangeRMinWidth = e => {
        const value = e.target.value
        dispatch(setRMinWidth(value))
        set_r_min_width(value)
    }
    const onChangeRMaxWidth = e => {
        const value = e.target.value
        dispatch(setRMaxWidth(value))
        set_r_max_width(value)
    }
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
                                    name="R_Min_Distance"
                                    rules={[{ required: false }]}
                                >
                                    <Input
                                        type='number'
                                        onChange={onChangeRMinDistance}
                                        placeholder="0.0"
                                        suffix={'Km'}
                                        disabled={!enabled}
                                        value={r_min_distance}
                                    />
                                </Form.Item>
                            </Col> */}
                            <Col xs={12}>
                                <Form.Item
                                    label={customLabel('Distance', true, null, enabled)}
                                    name="R_Max_Distance"
                                    rules={[{ required: false }]}
                                >
                                    <Input
                                        type='number'
                                        onChange={onChangeRMaxDistance}
                                        placeholder="0.0"
                                        suffix={'Km'}
                                        disabled={!enabled}
                                        value={r_max_distance}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={[6]}>
                    <Col xs={6}>
                        <span className='option-title'>Length</span>
                    </Col>
                    <Col xs={18}>
                        <Row gutter={[6]}>
                            <Col xs={12}>
                                <Form.Item
                                    label={customLabel('Min Length', true, null, enabled)}
                                    name="R_Min_Length"
                                    rules={[{ required: false }]}
                                >
                                    <Input
                                        type='number'
                                        onChange={onChangeRMinLength}
                                        placeholder="0.0"
                                        suffix={'Km'}
                                        disabled={!enabled}
                                        value={r_min_length}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={12}>
                                <Form.Item
                                    label={customLabel('Max Length', true, null, enabled)}
                                    name="R_Max_Length"
                                    rules={[{ required: false }]}
                                >
                                    <Input
                                        type='number'
                                        onChange={onChangeRMaxLength}
                                        placeholder="0.0"
                                        suffix={'Km'}
                                        disabled={!enabled}
                                        value={r_max_length}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={[6]}>
                    <Col xs={6}>
                        <span className='option-title'>Width</span>
                    </Col>
                    <Col xs={18}>
                        <Row gutter={[6]}>
                            <Col xs={12}>
                                <Form.Item
                                    label={customLabel('Min Width', true, null, enabled)}
                                    name="R_Min_Width"
                                    rules={[{ required: false }]}
                                >
                                    <Input
                                        type='number'
                                        onChange={onChangeRMinWidth}
                                        placeholder="0.0"
                                        suffix={'m'}
                                        disabled={!enabled}
                                        value={r_min_width}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={12}>
                                <Form.Item
                                    label={customLabel('Max Width', true, null, enabled)}
                                    name="R_Max_Width"
                                    rules={[{ required: false }]}
                                >
                                    <Input
                                        type='number'
                                        onChange={onChangeRMaxWidth}
                                        placeholder="0.0"
                                        suffix={'m'}
                                        disabled={!enabled}
                                        value={r_max_width}
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


export default RiverOptions