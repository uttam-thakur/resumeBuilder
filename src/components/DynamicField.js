import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Divider, Button, Select, Input } from "antd";

function DynamicField(props) {
  return (
    <Form.List name="fields">
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <div key={field.key}>
                <Divider>Language {index + 1}</Divider>
                <Form.Item
                  name={[index, "name"]}
                  label="Language"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="write a language" />
                </Form.Item>
                <Form.Item
                  label="Level"
                  name={[index, "type"]}
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Select.Option value="Beginner">Beginner</Select.Option>
                    <Select.Option value="Intermideate">Intermideate</Select.Option>
                    <Select.Option value="Advance">Advance</Select.Option>
                  </Select>
                </Form.Item>
                {/* <Form.Item name={[index, "options"]} label="Options">
                  <Input placeholder="option 1, option 2, option 3" />
                </Form.Item> */}
                {fields.length > 1 ? (
                  <Button
                    type="danger"
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                    icon={<MinusCircleOutlined />}
                  >
                    Remove Above Field
                  </Button>
                ) : null}
              </div>
            ))}
            <Divider />
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "200%" }}
              >
                <PlusOutlined /> 
                Add field
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
}

export default DynamicField;

