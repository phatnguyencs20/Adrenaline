import React, { useState, useEffect } from 'react';
import { Text, useTheme } from 'react-native-paper';

const messages = ['Xin chào!', 'Hi!', 'Ciao!', 'Bonjour!', 'Hola!', '안녕하세요!', 'こんにちは!', '你好!', 'नमस्ते!', 'Здравствуйте!', 'Olá!', 'Hallo!', 'Hej!', 'Привет!', 'Salut!', 'مرحبا!', 'Ahoj!'];

const WelcomeMessage = () => {
    const { colors } = useTheme();
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentMessageIndex(currentMessageIndex => (currentMessageIndex + 1) % messages.length);
        }, 1000);

        return () => clearTimeout(timer);
    }, [currentMessageIndex]);

    return (
        <Text
            variant='displaySmall'
            style={{ color: colors.primary, margin: '5%', fontWeight: '600' }}
        >
            {messages[currentMessageIndex]}
        </Text>
    );
};

export default WelcomeMessage;
