## Pass extra props

```javascript
// Before React Router 5
<Route path="/" component={Home} />
<Route path="/" render={({ match }) => <Profile match={match} mine={true} />}>

<Route path="/">
  <Home />
</Route>
```

## useHistory

```javascript
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();
  return <button onClick={() => history.push('/profile')}>Profile</button>;
}
```

## useLocation

```javascript
import { useLocation } from 'react-router-dom';

function Profile() {
  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname;
    const searchParams = new URLSearchParams(location.search);
  }, [location]);
  return <p>Profile</p>;
}
```

## useParams

```javascript
import { useParams, Route } from 'react-router-dom';

function Profile() {
  const { name } = useParams();
  return <p>{name}'s Profile</p>;
}

function Dashboard() {
  return (
    <>
      <nav>
        <Link to={`/profile/ann`}>Ann's Profile</Link>
      </nav>
      <main>
        <Route path="/profile/:name">
          <Profile />
        </Route>
      </main>
    </>
  );
}
```

## useRouteMatch

```javascript
import { useRouteMatch, Route } from 'react-router-dom';

function Auth() {
  const match = useRouteMatch();
  return (
    <>
      <Route path={`${match.url}/login`}>
        <Login />
      </Route>
      <Route path={`${match.url}/register`}>
        <Register />
      </Route>
    </>
  );
}
```

```javascript
import {
  Route,
  BrowserRouter as Router,
  Link,
  useRouteMatch,
} from 'react-router-dom';

function Profile() {
  const match = useRouteMatch('/profile/:name');

  return match ? <p>{match.params.name}'s Profile</p> : <p>My own profile</p>;
}

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/profile">My Profile</Link>
        <br />
        <Link to={`/profile/ann`}>Ann's Profile</Link>
      </nav>
      <Route path="/profile">
        <Profile />
      </Route>
    </Router>
  );
}
```

```javascript
```

---

1.[The Hooks of React Router | CSS-Tricks](https://css-tricks.com/the-hooks-of-react-router/)
