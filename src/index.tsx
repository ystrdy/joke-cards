import React, { FC, memo } from 'react';
import data from './data';
import { Card } from 'antd'
import Viewer from 'react-viewer';
import { useSetState } from 'react-use';

const { Meta } = Card;

const JokeCards: FC = memo(() => {
    const [state, setState] = useSetState({
        visible: false,
        imageUrl: '',
    });
    const show = (imageUrl: string) => setState({ visible: true, imageUrl });
    const hide = () => setState({ visible: false });
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {data.map((item: Record<string, any>) => (
                <Card
                    key={item.id}
                    hoverable
                    style={{ width: 240, margin: 10 }}
                    cover={
                        <img
                            alt={item.title}
                            src={item.img}
                            style={{ width: 240, height: 240, objectFit: 'cover' }}
                        />
                    }
                    onClick={show.bind(null, item.img)}
                >
                    <Meta title={item.title} />
                </Card>
            ))}
            <Viewer
                visible={state.visible}
                onClose={hide}
                images={[{ src: state.imageUrl }]}
                noNavbar
                noToolbar
                noImgDetails
                noFooter
            />
        </div>
    );
});

export default JokeCards;