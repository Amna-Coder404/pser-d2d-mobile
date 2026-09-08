import { Ionicons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'
import COLOR from '../constant/colors'
import styles from "../styles/drafts.styles"


const DraftCard = ({ item, onNext, onDelete }) => {
    return (
        <View style={styles.darftCard}>
            <TouchableOpacity onPress={onNext} style={styles.leftBtn}  >

                <Text style={styles.name}>
                    {item.person_name || "Unnamed Survey"}
                </Text>

                <Text>
                    Part {item.current_step} of 3
                </Text>


                <View style={styles.conSur}>
                    <Text style={styles.text}>  Continue Survey   </Text>
                    <Ionicons name='arrow-forward' color={COLOR.primary} size={23} />
                </View>


            </TouchableOpacity>

            <TouchableOpacity onPress={onDelete} style={styles.rightBtn} >
                <Ionicons name='trash' color={COLOR.error} size={32} />
            </TouchableOpacity>
        </View>
    )
}

export default DraftCard