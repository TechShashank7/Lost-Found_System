import React, { useState, useEffect, useContext } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { Search } from 'lucide-react'; // if you need icons inside modal
import { AuthContext } from '../context/AuthContext';

const ItemModal = ({ show, handleClose, handleSave, initialData }) => {
  const { user } = useContext(AuthContext); // Access user directly if needed, or simply let backend handle it
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    type: 'Lost',
    location: '',
    date: '',
    contactInfo: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        date: initialData.date ? initialData.date.substring(0, 10) : ''
      });
    } else {
      setFormData({
        itemName: '',
        description: '',
        type: 'Lost',
        location: '',
        date: '',
        contactInfo: ''
      });
    }
  }, [initialData, show]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modern-modal" centered backdrop="static">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fs-4">{initialData ? 'Update Item Details' : 'Report an Item'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <div className="row g-3">
            <div className="col-12 col-md-8">
              <Form.Group>
                <Form.Label className="form-label">Item Name</Form.Label>
                <Form.Control type="text" placeholder="e.g. What did you lost/found?" name="itemName" value={formData.itemName} onChange={handleChange} required />
              </Form.Group>
            </div>
            <div className="col-12 col-md-4">
              <Form.Group>
                <Form.Label className="form-label">Type</Form.Label>
                <Form.Select name="type" value={formData.type} onChange={handleChange}>
                  <option value="Lost">I Lost This</option>
                  <option value="Found">I Found This</option>
                </Form.Select>
              </Form.Group>
            </div>
            
            <div className="col-12">
              <Form.Group>
                <Form.Label className="form-label">Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Provide identifying details..." name="description" value={formData.description} onChange={handleChange} required />
              </Form.Group>
            </div>
            
            <div className="col-12 col-md-6">
              <Form.Group>
                <Form.Label className="form-label">Location</Form.Label>
                <Form.Control type="text" placeholder="Whwre did you find/lost this item?" name="location" value={formData.location} onChange={handleChange} required />
              </Form.Group>
            </div>
            
            <div className="col-12 col-md-6">
              <Form.Group>
                <Form.Label className="form-label">Date</Form.Label>
                <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
              </Form.Group>
            </div>
            
            <div className="col-12">
              <Form.Group>
                <Form.Label className="form-label">Contact Information</Form.Label>
                <Form.Control type="text" placeholder="Email or Phone number" name="contactInfo" value={formData.contactInfo} onChange={handleChange} required />
              </Form.Group>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <button type="button" className="btn btn-light px-4" onClick={handleClose}>Cancel</button>
          <button type="submit" className="btn btn-primary px-4 shadow-sm">{initialData ? 'Save Changes' : 'Submit Report'}</button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ItemModal;
