import { DefaultProps, Header } from '@mantine/core';
import { Link as NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as ChocolateLogo } from '../assets/chocolate-logo.svg';
import { ReactComponent as ChocolateText } from '../assets/chocolate-text.svg';
import Link from '../components/Link';
type MenuBarProps = DefaultProps;
interface ILinkConfig {
  path: string;
  title: string;
}
const linkConfig: ILinkConfig[] = [
  {
    path: '/',
    title: 'Projects',
  },
  {
    path: '/verify',
    title: 'Verify',
  },
];
function MenuBar(props: MenuBarProps) {
  return (
    <Header height={100} {...props}>
      <NavLink to="/" className="LinkSide">
        <ChocolateLogo width={64} height={64} />
        <ChocolateText />
      </NavLink>
      <ul className="Functions">
        {linkConfig.map((link) => (
          <li key={link.path}>
            <Link to={link.path}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </Header>
  );
}

export default styled(MenuBar)`
  display: flex;
  align-items: center;
  padding: 10px 24px;
  column-gap: 64px;

  .LinkSide {
    display: flex;
    align-items: center;
    column-gap: 16px;
  }
  ul {
    list-style-type: none;
  }
  .Functions {
    display: flex;
    flex-grow: 1;
    column-gap: 10px;
  }
` as React.FC;
