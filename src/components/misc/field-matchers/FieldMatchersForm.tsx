import React from 'react';
import { Form } from 'react-bootstrap';
import { FieldMatcher } from '../../../types/hoverfly';

type Props = {
  fieldMatcher?: FieldMatcher;
  onChange: (fieldMatcher: FieldMatcher) => void;
};

const FieldMatcherForm: React.FC<Props> = ({
  fieldMatcher = { matcher: 'exact', value: '' },
  onChange
}) => {
  const handleMatcherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newFieldMatcher = { ...fieldMatcher, [name]: value };
    onChange(newFieldMatcher);
    event.target.focus();
  };

  const handleConfigChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const newConfig = { ...fieldMatcher.config, [name]: checked };
    const atLeastOneTrueValue = Object.values(newConfig).some((v) => !!v);

    const newFieldMatcher = {
      ...fieldMatcher,
      config: atLeastOneTrueValue ? newConfig : undefined
    };
    onChange(newFieldMatcher);
  };

  return (
    <Form>
      <div className="row">
        <Form.Group className="col-md-6">
          <Form.Label>Matcher:</Form.Label>
          <Form.Control
            as="select"
            name="matcher"
            value={fieldMatcher.matcher}
            onChange={handleMatcherChange}>
            <option value="exact">Exact</option>
            <option value="glob">Glob</option>
            <option value="regex">Regex</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="col-md-6">
          <Form.Label>Value:</Form.Label>
          <Form.Control
            type="text"
            name="value"
            value={fieldMatcher.value}
            onChange={handleMatcherChange}
          />
        </Form.Group>
      </div>

      <Form.Group className="mt-3">
        <div className="d-flex justify-content-between">
          <Form.Check
            className="d-flex align-items-center gap-1"
            id="ignoreUnknown"
            type="checkbox"
            label={<Form.Check.Label htmlFor="ignoreUnknown">Ignore Unknown</Form.Check.Label>}
            name="ignoreUnknown"
            checked={fieldMatcher.config?.ignoreUnknown}
            onChange={handleConfigChange}
          />
          <Form.Check
            className="d-flex align-items-center gap-1"
            id="ignoreOrder"
            type="checkbox"
            label={<Form.Check.Label htmlFor="ignoreOrder">Ignore Order</Form.Check.Label>}
            name="ignoreOrder"
            checked={fieldMatcher.config?.ignoreOrder}
            onChange={handleConfigChange}
          />
          <Form.Check
            className="d-flex align-items-center gap-1"
            id="ignoreOccurrences"
            type="checkbox"
            label={
              <Form.Check.Label htmlFor="ignoreOccurrences">Ignore Occurrences</Form.Check.Label>
            }
            name="ignoreOccurrences"
            checked={fieldMatcher.config?.ignoreOccurrences}
            onChange={handleConfigChange}
          />
        </div>
      </Form.Group>
    </Form>
  );
};

export default FieldMatcherForm;