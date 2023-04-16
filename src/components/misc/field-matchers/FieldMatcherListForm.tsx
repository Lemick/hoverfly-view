import React from 'react';
import { FieldMatcher } from '../../../types/hoverfly';
import FieldMatcherForm from './FieldMatchersForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Form } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';

type Props = {
  fieldMatchers?: FieldMatcher[];
  onChange: (fieldMatchers: FieldMatcher[]) => void;
};

const FieldMatcherListForm: React.FC<Props> = ({ fieldMatchers = [], onChange }) => {
  const handleAdd = () => {
    onChange([...fieldMatchers, { matcher: 'exact', value: '' }]);
  };

  const handleUpdate = (index: number, fieldMatcher: FieldMatcher) => {
    const newMatchers = [...fieldMatchers];
    newMatchers[index] = fieldMatcher;
    onChange(newMatchers);
  };

  const handleDelete = (index: number) => {
    const newMatchers = [...fieldMatchers];
    newMatchers.splice(index, 1);
    onChange(newMatchers);
  };

  return (
    <Form className="mt-1">
      <fieldset>
        <h5>Matchers</h5>
        {fieldMatchers.map((fieldMatcher, index) => (
          <Card key={index} className="mb-3 mx-1 position-relative">
            <div className="position-absolute" style={{ right: '0px' }}>
              <Button variant="danger" onClick={() => handleDelete(index)} className="w-5">
                <TrashFill />
              </Button>
            </div>

            <Card.Body>
              <FieldMatcherForm
                fieldMatcher={fieldMatcher}
                onChange={(newFieldMatcher: FieldMatcher) => handleUpdate(index, newFieldMatcher)}
              />
            </Card.Body>
          </Card>
        ))}
        <div className="row mx-1">
          <Button variant="outline-success" onClick={handleAdd}>
            Add Field Matcher
          </Button>
        </div>
      </fieldset>
    </Form>
  );
};

export default FieldMatcherListForm;