import { connect } from 'react-redux';
import SongCardList from 'client/common/components/SongCardList';
import {
  isChartsFetching,
  getCurrentCharts,
  getChartsSelectedGenre,
} from 'client/features/charts/chartsSelectors';

import { loadMoreCharts } from 'client/features/charts/chartsActions';

// Container for SongCardList
const mapStateToProps = state => ({
  fetching: isChartsFetching(state),
  trackIds: getCurrentCharts(state),
  playlistName: getChartsSelectedGenre(state),
});

const mapDispatchToProps = dispatch => ({
  scrollFunc() {
    console.log('More charts');
    dispatch(loadMoreCharts());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
