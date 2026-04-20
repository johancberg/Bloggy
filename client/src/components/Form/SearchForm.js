import { useState } from 'react';
import { AppBar, TextField, Button } from '@mui/material';
import { MuiChipsInput } from 'mui-chips-input';
import SearchIcon from '@mui/icons-material/Search';

import useStyles from './styles';

const SearchForm = ({ filter, setFilter, searchPost }) => {
    const [ minimized, setMinimized ] = useState(true);
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
        <>
        { minimized ?
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                <Button onClick={() => setMinimized(false)} className={classes.searchButton} variant="outlined" color="primary"><SearchIcon /></Button>
            </AppBar>
        :
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                <Button onClick={() => setMinimized(true)} className={classes.searchButton} variant="contained" style={{ margin: '0 0 1em 0'}}><SearchIcon /></Button>
                <TextField id="PostSearch" name="search" variant="outlined" label="Seach Posts" fullWidth value={search} onChange={(e) => setFilter({ ...filter, search: e.target.value })} onKeyDown={handleKeyPress} />
                <MuiChipsInput id="PostTags" style={{ margin: '10px 0'}} value={tags} onAddChip={handleAdd} onDeleteChip={handleDelete} label="Search Tags" variant="outlined" />
                <Button style={{ margin: '10px 0 0 0'}} onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
        }
        </>
    )
}

export default SearchForm;