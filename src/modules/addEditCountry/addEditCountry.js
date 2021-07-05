import React, { Component } from 'react'
import { Input, Button, Col, Row, Form, Upload, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"

const layout = {
    labelCol: { span: 8, },
    wrapperCol: { span: 16, },
};

const validateMessages = {
    required: '${label} is required!',
};

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class AddItem extends Component {
    formRef = React.createRef();
    state = {
        isModalVisible: this.props.isModalVisible,
        imageUrl: '',
        loading: false,
    };

    componentDidUpdate(prevProps) {
        if (prevProps.isModalVisible !== this.props.isModalVisible) this.setState({ isModalVisible: this.props.isModalVisible })
        if (prevProps.imgSrc !== this.props.imgSrc) {
            if (this.props.imgSrc) this.setState({ imageUrl: this.props.imgSrc })
        }
    }

    componentDidMount() {
        if (this.props.imgSrc) this.setState({ imageUrl: this.props.imgSrc })
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    handleSubmit = () => {
        this.formRef.current.validateFields().then((values) => {
            this.props.addRecord(values, this.state.imageUrl);
            this.props.closeModal()
        }).catch((info) => {
            console.log('Validate Failed:', info);
        });
    }

    render() {
        const { imageUrl, loading } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <Modal title="Basic Modal" className="add__record--modal"
                footer={null}
                title="Add New Pets"
                visible={true}
                onOk={() => this.props.closeModal()}
                onCancel={() => this.props.closeModal()}>
                <Form ref={this.formRef} className="add__record--form" {...layout} name="nest-messages" onFinish={(values) => console.log(values)} validateMessages={validateMessages}>
                    <Row gutter={16}>
                        <Col sm={24} md={12} xs={{ span: 24 }}>
                            <Form.Item name={'name'} label={"Name"} rules={[{ required: true, whitespace: true }]}>
                                <Input placeholder={"Name"} />
                            </Form.Item>
                        </Col>

                        <Col sm={24} md={12} xs={{ span: 24 }}>
                            <Form.Item name={'capital'} label={"Capital"} rules={[{ required: true, whitespace: true }]}>
                                <Input placeholder={"Capital"} />
                            </Form.Item>
                        </Col>

                        <Col sm={24} md={12} xs={{ span: 24 }}>
                            <Form.Item name={'region'} label={"Region"} rules={[{ required: true, whitespace: true }]}>
                                <Input placeholder={"Region"} />
                            </Form.Item>
                        </Col>

                        <Col sm={24} md={12} xs={{ span: 24 }}>
                            <Form.Item name={'population'} label={"Population"} rules={[{ required: true, whitespace: true }]}>
                                <Input type="number" placeholder={"Population"} />
                            </Form.Item>
                        </Col>
                        <Col sm={24} md={12} xs={{ span: 24 }}>
                            <Form.Item label={"Country flag"} rules={[{ required: true, whitespace: true }]}>
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className="add__form--footer">
                        <Button onClick={() => { this.handleSubmit() }} type="primary" className="primary__btn" htmlType="submit">Save</Button>
                        <Button onClick={(e) => { this.props.closeModal() }} key="2" className="secondary_fill">
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Modal>
        )
    }
}
export default AddItem;
