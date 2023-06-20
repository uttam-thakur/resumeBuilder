
// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// import { Button as ButtonAnt, Form as FormAnt, Input } from 'antd';
// const formItemLayout = {
//   labelCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 4,
//     },
//   },
//   wrapperCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 20,
//     },
//   },
// };
// const formItemLayoutWithOutLabel = {
//   wrapperCol: {
//     xs: {
//       span: 24,
//       offset: 0,
//     },
//     sm: {
//       span: 20,
//       offset: 4,
//     },
//   },
// };
// const Ant = () => {
//   const onFinish = (values) => {
//     console.log('Received values of form:', values);
//   };
//   return (
//     <FormAnt
//       name="dynamic_form_item"
//       {...formItemLayoutWithOutLabel}
//       onFinish={onFinish}
//       style={{
//         maxWidth: 600,
//       }}
//     >
//       <FormAnt.List
//         name="names"
//         rules={[
//           {
//             validator: async (_, names) => {
//               if (!names || names.length < 2) {
//                 return Promise.reject(new Error('At least 2 passengers'));
//               }
//             },
//           },
//         ]}
//       >
//         {(fields, { add, remove }, { errors }) => (
//           <>
//             {fields.map((field, index) => (
//               <FormAnt.Item
//                 {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
//                 label={index === 0 ? 'Passengers' : ''}
//                 required={false}
//                 key={field.key}
//               >
//                 <FormAnt.Item
//                   {...field}
//                   validateTrigger={['onChange', 'onBlur']}
//                   rules={[
//                     {
//                       required: true,
//                       whitespace: true,
//                       message: "Please input passenger's name or delete this field.",
//                     },
//                   ]}
//                   noStyle
//                 >
//                   <Input
//                     placeholder="passenger name"
//                     style={{
//                       width: '60%',
//                     }}
//                   />
//                 </FormAnt.Item>
//                 {fields.length > 1 ? (
//                   <MinusCircleOutlined
//                     className="dynamic-delete-button"
//                     onClick={() => remove(field.name)}
//                   />
//                 ) : null}
//               </FormAnt.Item>
//             ))}
//             <FormAnt.Item>
//               <ButtonAnt
//                 type="dashed"
//                 onClick={() => add()}
//                 style={{
//                   width: '60%',
//                 }}
//                 icon={<PlusOutlined />}
//               >
//                 Add field
//               </ButtonAnt>
             
//               <FormAnt.ErrorList errors={errors} />
//             </FormAnt.Item>
//           </>
//         )}
//       </FormAnt.List>
//       <FormAnt.Item>
//         <ButtonAnt type="primary" htmlType="submit">
//           Submit
//         </ButtonAnt>
//       </FormAnt.Item>
//     </FormAnt>
//   );
// };
// export default Ant;




import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
import { useState } from 'react';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const Ant = () => {
  // const [componentDisabled, setComponentDisabled] = useState(true);
  return (
    <>
      {/* <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        Form disabled
      </Checkbox> */}
    
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
      >
    

  
     

        <Form.Item label="RangePicker">
          <RangePicker />
        </Form.Item>
{/*        
        <Form.Item label="Upload" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item> */}
       
      </Form>
    </>
  );
};
export default () => <Ant />;