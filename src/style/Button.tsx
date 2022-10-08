import styled from 'styled-components';

interface Props {
  color: string,
  theme: any
}

const Button = styled.button`
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #fff;
  background-color: ${(props: Props) => props.theme.colors[props.color]};
  border-color: ${(props: Props) => props.color};
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
`

export default Button