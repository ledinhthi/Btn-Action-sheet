import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Modal, Animated, Dimensions, Easing, TouchableOpacity } from 'react-native'
const height = Dimensions.get("window").height
const width = Dimensions.get("window").width
const BtnActionSheet = (props) => {
    const [isVisible, setIsVisible] = useState(true)
    const slideInOut = useRef(new Animated.Value(height)).current;
    const slideIn = () => {
        Animated.timing(slideInOut, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true
        }).start();
    }
    const slideOut = () => {
        Animated.timing(slideInOut, {
            toValue: height,
            useNativeDriver: true,
            duration: 600
        }).start(()=>{
            setIsVisible(false)
        });
    }

    const onChoseIndex = (index) => {
        slideOut()
        console.log("index", index)
    }

    const onCancel = () => {
        // slideOut()
    }

    // Didmount
    useEffect(() => {
        slideIn()
    }, [])

    // Unmount
    useEffect(() => {
        return () => {
            // slideOut()
        }
    }, [])


    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={isVisible}
        >
            <View
                style={[styles.modalView,
                {
                    ...StyleSheet.absoluteFillObject,

                }]}>
                <Animated.View style={[styles.inner,
                {
                    transform: [
                        {
                            translateY: slideInOut
                        }
                    ]
                }]}>
                    <View style={styles.bodyContainer}>
                        {/* Title */}
                        {props.title != "" && props.title != undefined
                            && <Text
                                style={[styles.titleStyle,
                                props.titleStyle]}>
                                {props?.title}
                            </Text>
                        }
                        {/* Button, title, index */}
                        {props?.data?.length > 0 &&
                            props.data.map((title, index) => {
                                return (
                                    <TouchableOpacity key={index} style={[styles.button, {
                                        borderTopWidth: props.title != "" && props.title != undefined && index == 0 ? 1 : index != 0 && index != props.data.length - 1? 1 : 0,
                                        borderTopColor:  props.title != "" && props.title != undefined && index == 0 ? '#707070' : index != 0 && index != props.data.length - 1 ? '#707070' : "#FFFFFF",
                                        borderBottomWidth: index != 0 && index != props.data.length - 1? 1 : 0,
                                        borderBottomColor:  index != 0 && index != props.data.length - 1 ? '#707070' : "#FFFFFF"
                                    }]}
                                        onPress={() => {
                                            onChoseIndex(index)
                                        }}
                                    >
                                        <Text style={[styles.btnTextStyle, props.btnTextStyle]}>
                                            {title}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }

                    </View>
                    {/* Cancel */}
                    <TouchableOpacity
                        style={[styles.cancelBtn, props.cancelBtn]}
                        onPress={onCancel}
                    >
                        <Text style={[styles.cancelTextStyle, props.cancelTextStyle]}>
                            {props?.cancelTitle || "Hủy"}
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        zIndex: 999999,
        backgroundColor: 'rgba(112,112,112,0.7)',
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 23 / 2,
        marginBottom: 15,
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
    },
    bodyContainer: {
        width: '100%',
        borderRadius: 15,
        overflow:'hidden'
        // backgroundColor: "white"
    },
    button: {
        paddingVertical: 25 / 2,
        paddingHorizontal: 10,
         backgroundColor: "white"
    },
    cancelBtn: {
        width: '100%',
        marginTop: 9,
        borderRadius: 15,
        paddingVertical: 25 / 2,
        paddingHorizontal: 10,
        backgroundColor: "white"
    },
    titleStyle: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        fontSize: 14,
        color: '#000000',
        textAlign: 'center',
        backgroundColor: "white"
    },
    btnTextStyle: {
        fontSize: 20,
        color: '#000000',
        fontWeight: '600',
        textAlign: 'center',
    },
    cancelTextStyle: {
        textAlign: 'center',
        fontSize: 20,
        color: '#000000',
        fontWeight: '600'
    }
})

export { BtnActionSheet }