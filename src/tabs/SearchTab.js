import { Text, Center } from 'native-base';
import { useState } from 'react';
import { getSearchResults } from '../services/api';
import SearchForm from '../forms/SearchForm';
import Loading from '../layout/Loading';
import ItemList from '../lists/ItemList';

const SearchTab = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [results, setResults] = useState([]);
    const [mediaType, setMediaType] = useState('');

    // Call the API to get the search results
    const callSearchResults = (selectedMediaType, inputText, isError) => {
        if (isError) {
            // Do nothing if the input is invalid
            setResults([]);
            setIsLoading(false);
        } else {
            // Call the API to get the search results
            setIsLoading(true);
            setMediaType(selectedMediaType);
            getSearchResults(selectedMediaType, inputText).then(res => {
                setResults(res.results);
                setIsLoading(false);
            }
            ).catch(err => {
                console.log(err);
            }
            );
        }
    };

    return (
        <>
            <SearchForm callSearchResults={callSearchResults} />
            {
                isLoading
                    ? <Loading />
                    :
                    results.length > 0 ?
                        <ItemList navigation={navigation} list={results} mediaType={mediaType} />
                        :
                        <Center mt={10} >
                            <Text fontSize={"lg"} fontWeight="medium">Please initiate a search</Text>
                        </Center>
            }
        </>
    )
}
export default SearchTab;

