import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const heroes = useSelector(state => state.heroes);
    const heroesLoadingStatus = useSelector(state => state.heroesLoadingStatus);
    const activeFilter = useSelector(state => state.activeFilter);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request('http://localhost:3001/heroes')
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()));

        // eslint-disable-next-line
    }, []);

    const onDelete = id => {
        dispatch(heroDeleted(id));
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(() => {})
            .catch(() => {
                dispatch(heroesFetching());
                request('http://localhost:3001/heroes')
                    .then(data => dispatch(heroesFetched(data)))
                    .catch(() => dispatch(heroesFetchingError));
            });
    };

    if (heroesLoadingStatus === 'loading') {
        return <Spinner />;
    } else if (heroesLoadingStatus === 'error') {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }

    const renderHeroesList = arr => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>;
        }

        const filteredArr =
            activeFilter !== 'all' ? arr.filter(item => item.element === activeFilter) : arr;

        return filteredArr.map(({ id, ...props }) => {
            return <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)} />;
        });
    };

    const elements = renderHeroesList(heroes);
    return <ul>{elements}</ul>;
};

export default HeroesList;
