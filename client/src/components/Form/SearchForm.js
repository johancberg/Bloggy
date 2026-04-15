import { AppBar, TextField, Button } from '@mui/material';
import { MuiChipsInput } from 'mui-chips-input';

import useStyles from './styles';

const SearchForm = ({ filter, setFilter, searchPost }) => {
    const { search, tags } = filter;
    const classes = useStyles();

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
        searchPost();
        }
    };

    const handleAdd = (tag) => setFilter({ ...filter, tags: [...tags, tag] });
    const handleDelete = (tagToDelete) => setFilter({ ...filter, tags: tags.filter((tag) => tag !== tagToDelete) });

    return (
        <AppBar className={classes.appBarSearch} position="static" color="inherit">
            <TextField id="PostSearch" name="search" variant="outlined" label="Seach Posts" fullWidth value={search} onChange={(e) => setFilter({ ...filter, search: e.target.value })} onKeyDown={handleKeyPress} />
            <MuiChipsInput id="PostTags" style={{ margin: '10px 0'}} value={tags} onAddChip={handleAdd} onDeleteChip={handleDelete} label="Search Tags" variant="outlined" />
            <Button style={{ margin: '10px 0 0 0'}} onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
        </AppBar>
    )
}

export default SearchForm;