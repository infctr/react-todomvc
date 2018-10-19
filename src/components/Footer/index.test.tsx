import React from 'react';
import { shallow } from 'enzyme';

import { GetComponentProps } from 'utils/types';

import Footer from './index';

describe('Footer component', () => {
  const render = (props: GetComponentProps<typeof Footer>) =>
    shallow(<Footer {...props} />);

  it('should render correctly', () => {
    const tree = render({ completedCount: 5, count: 10 });

    expect(tree).toMatchSnapshot();
  });
});
