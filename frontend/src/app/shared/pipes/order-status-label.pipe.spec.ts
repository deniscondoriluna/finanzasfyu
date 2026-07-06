import { OrderStatusLabelPipe } from './order-status-label.pipe';

describe('OrderStatusLabelPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderStatusLabelPipe();
    expect(pipe).toBeTruthy();
  });
});
