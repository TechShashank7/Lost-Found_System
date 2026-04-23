import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import ItemModal from '../components/ItemModal';
import { Search, Plus, Edit2, Trash2, MapPin, Calendar, Phone, X, PackageOpen, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loadingLocal, setLoadingLocal] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchItems();
    }
  }, [user, navigate]);

  const fetchItems = async () => {
    setLoadingLocal(true);
    try {
      const { data } = await axios.get('/api/items');
      setItems(data);
    } catch (error) {
      toast.error('Error fetching items');
    } finally {
      setLoadingLocal(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoadingLocal(true);
    try {
      const { data } = await axios.get(`/api/items/search?name=${searchTerm}`);
      setItems(data);
    } catch (error) {
      toast.error('Search failed');
    } finally {
      setLoadingLocal(false);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    fetchItems();
  };

  const handleShowAdd = () => {
    setCurrentEditItem(null);
    setShowModal(true);
  };

  const handleShowEdit = (item) => {
    setCurrentEditItem(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`/api/items/${id}`);
        toast.success('Item deleted successfully');
        fetchItems();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error deleting item');
      }
    }
  };

  const handleSaveItem = async (formData) => {
    try {
      if (currentEditItem) {
        await axios.put(`/api/items/${currentEditItem._id}`, formData);
        toast.success('Item updated successfully');
      } else {
        await axios.post('/api/items', formData);
        toast.success('Item added successfully');
      }
      setShowModal(false);
      fetchItems();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving item');
    }
  };

  return (
    <div className="container pb-5">
      <div className="dash-header d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <h2>Welcome back, <span style={{color: 'url(#gradient) var(--primary)' }}>{user?.name.split(' ')[0]}</span> 👋</h2>
          <p className="dash-subtitle mb-0">Overview of all reported lost and found items.</p>
        </div>
        <button className="btn btn-primary shadow-sm rounded-pill px-4" onClick={handleShowAdd}>
          <Plus size={20} /> Report Item
        </button>
      </div>

      <div className="search-container">
        <form onSubmit={handleSearch}>
          <div className="search-input-group position-relative">
            <Search className="search-icon-large" size={22} />
            <input
              type="text"
              className="form-control"
              placeholder="Search items by name or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button type="button" className="btn-clear-search" onClick={handleClearSearch}>
                <X size={20} />
              </button>
            )}
          </div>
        </form>
      </div>

      {loadingLocal ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <PackageOpen size={64} className="empty-illustration" />
          <h3 className="empty-text">No items found</h3>
          <p className="empty-subtext">There are currently no items matching your criteria. Be the first to report something!</p>
        </div>
      ) : (
        <div className="row g-4">
          {items.map((item) => (
            <div className="col-12 col-md-6 col-lg-4" key={item._id}>
              <div className="item-card">
                <div className="item-card-header">
                  <span className={`modern-badge ${item.type === 'Lost' ? 'badge-lost' : 'badge-found'}`}>
                    {item.type}
                  </span>
                  <span className="date-badge">
                    {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                
                <div className="item-card-body">
                  <h3 className="item-card-title">{item.itemName}</h3>
                  <p className="item-card-desc">{item.description}</p>
                  
                  <div className="info-list">
                    <div className="info-row">
                      <MapPin size={16} /> <span>{item.location}</span>
                    </div>
                    <div className="info-row">
                      <Calendar size={16} /> <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <div className="info-row">
                      <Phone size={16} /> <span>{item.contactInfo}</span>
                    </div>
                  </div>
                  
                  <div className="item-reporter">
                    <User size={14} /> Reported by <span className="fw-medium text-dark">{item.user?.name || 'Unknown'}</span>
                  </div>
                </div>
                
                {user && item.user?._id === user._id && (
                  <div className="item-card-footer">
                    <button className="btn btn-outline-primary btn-sm rounded-pill px-3" onClick={() => handleShowEdit(item)}>
                      <Edit2 size={14} /> Edit
                    </button>
                    <button className="btn btn-outline-danger btn-sm rounded-pill px-3" onClick={() => handleDelete(item._id)}>
                      <Trash2 size={14} /> Detele
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <ItemModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveItem}
        initialData={currentEditItem}
      />
    </div>
  );
};

export default Dashboard;
