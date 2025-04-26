const propertiesData = [
    {
        id: 1,
        ciudad: "Barranquilla",
        nombre: "Macaro",
        type: "apartamento",
        price: 850000000,
        oldPrice: 950000000,
        area: 80,
        habitaciones: 3,
        baños: 2,
        parqueadores: 1,
        image: "https://media-cdn.tripadvisor.com/media/photo-c/1280x250/09/a2/58/15/plaza-san-nicolas.jpg",
        lat: 10.9639,
        lng: -74.7964,  
        description: "Hermosa casa moderna en el exclusivo barrio El Poblado, con amplios espacios, acabados de lujo y vista panorámica."
    },
    {
        id: 2,
        ciudad: "Bogotá",
        nombre: "Pinar de la Fontana",
        type: "casa",
        price: 255000000,
        oldPrice: 315000000,
        area: 58,
        habitaciones: 2,
        baños: 2,
        parqueadores: 0,
        image: "https://www.eycbienesraices.com/wp-content/uploads/WPL/290/thimg_20231003_105948_1000x750.jpg",
        lat: 4.7110,
        lng: -74.0721,  
        description: "Hermosa casa moderna en el exclusivo barrio El Poblado, con amplios espacios, acabados de lujo y vista panorámica."
    },
    {
        id: 3,
        ciudad: "Jamundí",
        nombre: "Tangara",
        type: "apartamento",
        price: 350000000,
        oldPrice: 400000000,
        area: 100,
        habitaciones: 2,
        baños: 2,
        parqueadores: 1,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        lat: 3.2630,
        lng: -76.5377,  
        description: "Hermosa casa moderna en el exclusivo barrio El Poblado, con amplios espacios, acabados de lujo y vista panorámica."
    },
    {
        id: 4,
        ciudad: "Rionegro",
        nombre: "Alejandría",
        type: "lote",
        price: 190000000,
        oldPrice: 240000000,
        area: 54,
        habitaciones: 2,
        baños: 2,
        parqueadores: 1,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        lat: 6.1532,
        lng: -75.3740,  
        description: "Hermosa casa moderna en el exclusivo barrio El Poblado, con amplios espacios, acabados de lujo y vista panorámica."
    }


];

function PropertyCard({ property, onViewDetail }) {
    const discount = Math.round(((property.oldPrice - property.price) / property.oldPrice) * 100);
    
    return (
        <div className="property-card">
            <div className="property-image-container">
                <img src={property.image} alt={property.nombre} className="property-image" />
                {discount > 0 && <span className="discount-badge">{discount}% OFF</span>}
            </div>
            <div className="property-info">
                <h3>{property.nombre}</h3>
                <p className="property-ciudad">{property.ciudad}</p>
                <div className="property-features">
                    <span>{property.area} m²</span>
                    <span>{property.habitaciones} hab.</span>
                    <span>{property.baños} baños</span>
                    <span>{property.parqueadores} parq.</span>
                </div>
                <div className="property-prices">
                    <span className="current-prices">${property.price.toLocaleString()}</span>
                    {property.oldPrice > property.price && 
                        <span className="old-price">${property.oldPrice.toLocaleString()}</span>}
                </div>
                <button onClick={() => onViewDetail(property)} className="view-detail-btn">
                    Ver Detalle
                </button>
            </div>
        </div>
    );
}

function PropertyDetail({ property, onBack }) {
    return (
        <div className="property-detail">
            <button onClick={onBack} className="back-button">← Volver al catálogo</button>
            
            <h1>{property.name}</h1>
            <p className="property-location">{property.city}</p>
            
            {/* ... resto del contenido ... */}
            
            <div className="detail-container">
                <div className="detail-images">
                    <img src={property.image} alt={property.nombre} className="main-image" />
                </div>
                
                <div className="detail-info">
                    <div className="detail-features">
                        <div>
                            <strong>Área:</strong>
                            <span>{property.area} m²</span>
                        </div>
                        <div>
                            <strong>Habitaciones:</strong>
                            <span>{property.habitaciones}</span>
                        </div>
                        <div>
                            <strong>baños:</strong>
                            <span>{property.baños}</span>
                        </div>
                        <div>
                            <strong>Parqueaderos:</strong>
                            <span>{property.parqueadores}</span>
                        </div>
                    </div>
                    
                    <div className="detail-prices">
                        <h2>${property.price.toLocaleString()}</h2>
                        {property.oldPrice > property.price && 
                            <p className="old-price">Antes: ${property.oldPrice.toLocaleString()}</p>}
                    </div>
                    
                    <p className="property-description">{property.description}</p>
                    
                    <a 
                        href={`https://www.google.com/maps?q=${property.lat},${property.lng}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="maps-button"
                    >
                        Ver en Google Maps
                    </a>
                </div>
            </div>
            
            <div className="map-container">
                <iframe
                    width="100%"
                    height="300"
                    style={{border: 0}}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.lng-0.01},${property.lat-0.01},${property.lng+0.01},${property.lat+0.01}&layer=mapnik&marker=${property.lat},${property.lng}`}>
                </iframe>
                <br/>
                <small>
                    <a 
                        href={`https://www.openstreetmap.org/?mlat=${property.lat}&mlon=${property.lng}#map=15/${property.lat}/${property.lng}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        Ver mapa más grande
                    </a>
                </small>
            </div>
        </div>
    );
}

function Home({ properties, onViewDetail, onFilterChange, onSortChange }) {
    return (
        <div className="home">
            <h1>Catálogo de Propiedades</h1>
            
            <div className="filters">
                <div className="filter-group">
                    <label htmlFor="type-filter">Filtrar por tipo:</label>
                    <select id="type-filter" onChange={onFilterChange}>
                        <option value="todos">Todos</option>
                        <option value="casa">Casas</option>
                        <option value="apartamento">Apartamentos</option>
                        <option value="lote">Lotes</option>
                    </select>
                </div>
                
                <div className="filter-group">
                    <label htmlFor="sort">Ordenar por:</label>
                    <select id="sort" onChange={onSortChange}>
                        <option value="default">Recomendados</option>
                        <option value="price-asc">Precio: menor a mayor</option>
                        <option value="price-desc">Precio: mayor a menor</option>
                    </select>
                </div>
            </div>
            
            <div className="properties-grid">
                {properties.length > 0 ? (
                    properties.map(property => (
                        <PropertyCard 
                            key={property.id} 
                            property={property} 
                            onViewDetail={onViewDetail} 
                        />
                    ))
                ) : (
                    <p className="no-results">No se encontraron propiedades con los filtros seleccionados.</p>
                )}
            </div>
        </div>
    );
}

function App() {
    const [properties, setProperties] = React.useState(propertiesData);
    const [selectedProperty, setSelectedProperty] = React.useState(null);
    const [filteredProperties, setFilteredProperties] = React.useState(propertiesData);
    
    const handleViewDetail = (property) => {
        setSelectedProperty(property);
        window.location.hash = `detalle-${property.id}`;
    };
    
    const handleBack = () => {
        setSelectedProperty(null);
        window.location.hash = '';
    };
    
    const handleFilterChange = (e) => {
        const type = e.target.value;
        let filtered = [...properties];
        
        if (type !== 'todos') {
            filtered = filtered.filter(prop => prop.type === type);
        }
        
        setFilteredProperties(filtered);
    };
    
    const handleSortChange = (e) => {
        const sortOption = e.target.value;
        let sorted = [...filteredProperties];
        
        switch (sortOption) {
            case 'price-asc':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sorted.sort((a, b) => b.price - a.price);
                break;
            default:
                sorted = [...properties];
                break;
        }
        
        setFilteredProperties(sorted);
    };
    
    React.useEffect(() => {
        const hash = window.location.hash;
        if (hash.startsWith('#detalle-')) {
            const id = parseInt(hash.replace('#detalle-', ''));
            const property = propertiesData.find(p => p.id === id);
            if (property) setSelectedProperty(property);
        }
    }, []);
    
    return (
        <div className="app">
            {selectedProperty ? (
                <PropertyDetail 
                    property={selectedProperty} 
                    onBack={handleBack} 
                />
            ) : (
                <Home 
                    properties={filteredProperties} 
                    onViewDetail={handleViewDetail}
                    onFilterChange={handleFilterChange}
                    onSortChange={handleSortChange}
                />
            )}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
