// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHttp } from '../../hooks/http.hook';
import {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged,
} from '../../actions';
import classNames from 'classnames';

const HeroesFilters = () => {
    const filters = useSelector(state => state.filters);
    const activeFilter = useSelector(state => state.activeFilter);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(filtersFetching());
        request('http://localhost:3001/filters')
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()));
    }, []);

    const onFilterChange = filter => {
        dispatch(activeFilterChanged(filter));
    };

    const renderFilters = () => {
        if (filters.length === 0) {
            return <h5>Фильтры не найдены</h5>;
        }

        return filters.map(({ name, label, className }) => {
            const btnClass = classNames('btn', className, {
                active: name === activeFilter,
            });

            return (
                <button key={name} className={btnClass} onClick={() => onFilterChange(name)}>
                    {label}
                </button>
            );
        });
    };

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">{renderFilters()}</div>
            </div>
        </div>
    );
};

export default HeroesFilters;
