import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input, Row, Col, Checkbox } from 'antd'
import customLabel from '../../../features/utils/CustomLabel'
import { ErrorCheck } from '../Error/ErrorCheck'
import {
  setTMinDistance,
  setTMaxDistance,
  setTMinArea,
  setTMaxArea,
  setTHospitalExist,
  setTStationExist,
  setTHospitalDistance,
  setTStationDistance,
  setTSchoolDistance,
  setTHospitalLabel,
  setTStationLabel,
  setTSchoolLabel,
  setErrorMessage
} from '../../../features/filter/OptionReducer'

import './options.css'

const TownOptions = () => {
  const [enabled, setEnabled] = useState(true)
  const [t_min_distance, set_t_min_distance] = useState('')
  const [t_max_distance, set_t_max_distance] = useState('')
  const [t_min_area, set_t_min_area] = useState('')
  const [t_max_area, set_t_max_area] = useState('')
  const [t_hospital_exist, set_t_hospital_exist] = useState(false)
  const [t_station_exist, set_t_station_exist] = useState(false)
  const [t_hospital_distance, set_t_hospital_distance] = useState('')
  const [t_station_distance, set_t_station_distance] = useState('')
  const [t_school_distance, set_t_school_distance] = useState('')
  const [t_hospital_label, set_t_hospital_label] = useState(false)
  const [t_station_label, set_t_station_label] = useState(false)
  const [t_school_label, set_t_school_label] = useState(false)

  const dispatch = useDispatch()

  const onChangeTMinDistance = e => {
    const value = e.target.value
    dispatch(setTMinDistance(value))
    set_t_min_distance(value)
  }
  const onChangeTMaxDistance = e => {
    const value = e.target.value
    dispatch(setTMaxDistance(value))
    set_t_max_distance(value)
  }
  const onChangeTMinArea = e => {
    const value = e.target.value
    dispatch(setTMinArea(value))
    set_t_min_area(value)
  }
  const onChangeTMaxArea = e => {
    const value = e.target.value
    dispatch(setTMaxArea(value))
    set_t_max_area(value)
  }
  const onChangeTHospitalExist = e => {
    const value = e.target.checked
    dispatch(setTHospitalExist(value))
    set_t_hospital_exist(value)
  }

  const onChangeTStationExist = e => {
    const value = e.target.checked
    dispatch(setTStationExist(value))
    set_t_station_exist(value)
  }

  const onChangeTHospitalDistance = e => {
    const value = e.target.value
    dispatch(setTHospitalDistance(value))
    set_t_hospital_distance(value)
  }

  const onChangeTStationDistance = e => {
    const value = e.target.value
    dispatch(setTStationDistance(value))
    set_t_station_distance(value)
  }

  const onChangeTSchoolDistance = e => {
    const value = e.target.value
    dispatch(setTSchoolDistance(value))
    set_t_school_distance(value)
  }

  const onChangeHospitalLabel = e => {
    const value = e.target.checked
    dispatch(setTHospitalLabel(value))
    set_t_hospital_label(value)
  }

  const onChangeStationLabel = e => {
    const value = e.target.checked
    dispatch(setTStationLabel(value))
    set_t_station_label(value)
  }

  const onChangeSchoolLabel = e => {
    const value = e.target.checked
    dispatch(setTSchoolLabel(value))
    set_t_school_label(value)
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
        {/* <Row gutter={[6]}>
          <Col xs={6}>
            <span className='option-title'>Distance</span>
          </Col>
          <Col xs={18}>
            <Row gutter={[6]}>
              <Col xs={12}>
                <Form.Item
                  label={customLabel('Min Distance', true, null, enabled)}
                  name="T_Min_Distance"
                  rules={[{ required: false }]}
                >
                  <Input
                    type='number'
                    onChange={onChangeTMinDistance}
                    placeholder="0.0"
                    suffix={'Km'}
                    disabled={!enabled}
                    value={t_min_distance}
                  />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item
                  label={customLabel('', true, null, enabled)}
                  name="T_Max_Distance"
                  rules={[{ required: false }]}
                >
                  <Input
                    type='number'
                    onChange={onChangeTMaxDistance}
                    placeholder="0.0"
                    suffix={'Km'}
                    disabled={!enabled}
                    value={t_max_distance}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row> */}
        {/* <Row gutter={[6]}>
          <Col xs={6}>
            <span className='option-title'>Area</span>
          </Col>
          <Col xs={18}>
            <Row gutter={[6]}>
              <Col xs={12}>
                <Form.Item
                  label={customLabel('Min Area', true, null, enabled)}
                  name="T_Min_Area"
                  rules={[{ required: false }]}
                >
                  <Input
                    type='number'
                    onChange={onChangeTMinArea}
                    placeholder="0.0"
                    suffix={'ha'}
                    disabled={!enabled}
                    value={t_min_area}
                  />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item
                  label={customLabel('Max Area', true, null, enabled)}
                  name="T_Max_Area"
                  rules={[{ required: false }]}
                >
                  <Input
                    type='number'
                    onChange={onChangeTMaxArea}
                    placeholder="0.0"
                    suffix={'ha'}
                    disabled={!enabled}
                    value={t_max_area}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row> */}
        <Row gutter={[6]}>
          <Col xs={6}>
            <span className='option-title'>Distance</span>
          </Col>
          <Col xs={18}>
            <Row gutter={[6]}>
              <Col xs={8}>
                <Form.Item
                  label={customLabel('Hospital', false, onChangeHospitalLabel, enabled)}
                  name="T_Hospital_Distance"
                  rules={[{ required: false }]}
                >
                  <Input
                    type='number'
                    onChange={onChangeTHospitalDistance}
                    placeholder="0.0"
                    suffix={'Km'}
                    disabled={!t_hospital_label}
                    value={t_hospital_distance}
                  />
                </Form.Item>
              </Col>
              <Col xs={8}>
                <Form.Item
                  label={customLabel('Station', false, onChangeStationLabel, enabled)}
                  name="T_Station_Distance"
                  rules={[{ required: false }]}
                >
                  <Input
                    type='number'
                    onChange={onChangeTStationDistance}
                    placeholder="0.0"
                    suffix={'Km'}
                    disabled={!t_station_label}
                    value={t_station_distance}
                  />
                </Form.Item>
              </Col>
              <Col xs={8}>
                <Form.Item
                  label={customLabel('School', false, onChangeSchoolLabel, enabled)}
                  name="T_School_Distance"
                  rules={[{ required: false }]}
                >
                  <Input
                    type='number'
                    onChange={onChangeTSchoolDistance}
                    placeholder="0.0"
                    suffix={'Km'}
                    disabled={!t_school_label}
                    value={t_school_distance}
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

export default TownOptions