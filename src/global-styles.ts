import { css } from 'lit';

export const globalStyles = css`
mwc-textfield, mwc-textarea, mwc-select {
  width: 100%;
}

.flex, header {
  display: flex;
  align-items: center;
}

.strip, header {
  background-color: #eeeeee;
  border-radius: 2px;
  cursor: pointer;
}

.strip {
  padding: 12px;
  margin: 6px;
}

header {
  padding: 3px;
  margin: 4px;
}
`