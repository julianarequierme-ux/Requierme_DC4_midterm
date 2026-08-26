import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";

const events = [
  {
    id: "1",
    title: "programming tutorial",
    date: "September 10, 2026",
    location: "Computer Laboratory 2",
    description: "Learn the basics of programming."
  },
  {
    id: "2",
    title: "ICT Congress",
    date: "September 15, 2026",
    location: "MDC at Activity center",
    description: "Learn about the latest trends in information and communication technology."
  },
  {
    id: "3",
    title: "javascript workshop",
    date: "September 20, 2026",
    location: "Computer Laboratory 1",
    description: "Learn the fundamentals of JavaScript programming."
  }
];

function Navbar() {
  return (
    <nav>
      <h2>EventHub</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div className="container">
      <h1>Welcome to EventHub</h1>

      <p>
        Discover and register for exciting events happening around you. From programming tutorials to ICT congresses, EventHub has it all!
      </p>

      <Link className="button" to="/events">
        View Events
      </Link>
    </div>
  );
}

function Events() {
  return (
    <div className="container">
      <h1>Upcoming Events</h1>

      <div className="events">
        {events.map((event) => (
          <div className="card" key={event.id}>
            <h2>{event.title}</h2>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>

            <Link to={`/events/${event.id}`}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventDetails() {
  const { id } = useParams();

  const event = events.find((event) => event.id === id);

  if (!event) {
    return (
      <div className="container">
        <h1>Event Not Found</h1>
        <Link to="/events">Back to Events</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>{event.title}</h1>

      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p>{event.description}</p>

      <Link className="button" to="/register">
        Register for this Event
      </Link>
    </div>
  );
}

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    "full name": "",
    "emailaddress": "",
    "event": ""
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    // Validation 1: Name
    if (formData["full name"].trim() === "") {
      newErrors["full name"] = "Name is required.";
    }

    // Validation 2: Email
    if (formData["emailaddress"].trim() === "") {
      newErrors["emailaddress"] = "Email is required.";
    } else if (!formData["emailaddress"].includes("@")) {
      newErrors["emailaddress"] = "Please enter a valid email address.";
    }

    // Validation 3: Event
    if (formData["event"] === "") {
      newErrors["event"] = "Please select an event.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate("/confirmation", {
        state: {
          "full name": formData["full name"],
          "emailaddress": formData["emailaddress"],
          "event": formData["event"]
        }
      });
    }
  }

  return (
    <div className="container">
      <h1>Register for an Event</h1>

      <form onSubmit={handleSubmit}>

        <label>Name</label>
        <input
          type="text"
          name="full name"
          value={formData["full name"]}
          onChange={handleChange}
          placeholder="Enter your name"
        />

        {errors["full name"] && (
          <p className="error">{errors["full name"]}</p>
        )}

        <label>Email</label>
        <input
          type="email"
          name="emailaddress"
          value={formData["emailaddress"]}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        {errors["emailaddress"] && (
          <p className="error">{errors["emailaddress"]}</p>
        )}

        <label>Select Event</label>

        <select
          name="event"
          value={formData["event"]}
          onChange={handleChange}
        >
          <option value="">Select an Event</option>

          {events.map((event) => (
            <option key={event.id} value={event.title}>
              {event.title}
            </option>
          ))}
        </select>

        {errors["event"] && (
          <p className="error">{errors["event"]}</p>
        )}

        <button type="submit">
          Register
        </button>

      </form>
    </div>
  );
}

function Confirmation() {
  return (
    <div className="container">
      <h1>Registration Successful!</h1>

      <p>
        Thank you for registering with EventHub.
      </p>

      <Link className="button" to="/events">
        Back to Events
      </Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App



// import { Routes, Route } from 'react-router-dom'
// import NavBar from './NavBar.jsx'
// import Home from './Home.jsx'
// import About from './About.jsx'
// import Contact from './Contact.jsx'
// import Thankyou from './Thankyou.jsx'

// function App() {
//   return (
//     <>
//       <NavBar />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/thankyou" element={<Thankyou />} />
//       </Routes>
//     </>
//   )
// }

// export default App