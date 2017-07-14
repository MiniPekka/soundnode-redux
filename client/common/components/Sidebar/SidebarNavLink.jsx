import NavLink from 'common/components/links/NavLink';

const SidebarNavLink = NavLink.extend.attrs({
  // Passing activeClassName as default
  activeClassName: 'sidebarLinkActive',
})`
  font-size: 1.1rem;
  display: block;
  text-align: center;
  color: ${props => props.theme.fontColor};
  transition: color 0.25s ease-out;

  &:hover, &:active {
    color: ${props => props.theme.fontColorSub};
  }

  &.${props => props.activeClassName} {
    background: rgba(255,255,255,0.2);
  }
`;

export default SidebarNavLink;
