import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { v4 as uuid } from 'uuid';
import { heroCreated } from '../../reducers/heroesSlice';

const HeroesAddForm = () => {
    const thumbnailDefalt =
        'https://i.pinimg.com/originals/92/8c/99/928c995af69ca04add905a95e3149522.jpg';
    const [heroName, setHeroName] = useState('');
    const [heroDescription, setHeroDescription] = useState('');
    const [heroElement, setHeroElement] = useState('');
    const [heroThumbnail, setHeroThumbnail] = useState(thumbnailDefalt);

    const dispatch = useDispatch();
    const { request } = useHttp();

    const onSubmitHandler = e => {
        e.preventDefault();

        const newHero = {
            id: uuid(),
            name: heroName,
            description: heroDescription,
            element: heroElement,
            thumbnail: heroThumbnail,
        };

        dispatch(heroCreated(newHero));

        request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero)).catch(e =>
            console.log(e)
        );

        setHeroName('');
        setHeroDescription('');
        setHeroElement('');
        setHeroThumbnail(thumbnailDefalt);
    };

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">
                    Имя нового героя
                </label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    value={heroName}
                    placeholder="Как меня зовут?"
                    onChange={e => setHeroName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">
                    Описание
                </label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    value={heroDescription}
                    placeholder="Что я умею?"
                    style={{ height: '130px' }}
                    onChange={e => setHeroDescription(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">
                    Выбрать элемент героя
                </label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    value={heroElement}
                    onChange={e => setHeroElement(e.target.value)}
                >
                    <option>Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">
                    Выбрать Аватарку
                </label>
                <input
                    required
                    type="text"
                    name="thumbnail"
                    className="form-control"
                    id="thumbnail"
                    value={heroThumbnail}
                    placeholder="Как я выгляжу"
                    onChange={e => setHeroThumbnail(e.target.value)}
                />
            </div>

            <button type="submit" className="btn btn-primary">
                Создать
            </button>
        </form>
    );
};

export default HeroesAddForm;
