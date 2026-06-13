import { ActionSheetItem, useActionSheet } from '@/components/ui';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export function ActionSheetExample() {
  const { show } = useActionSheet();
  const [selectedValue, setSelectedValue] = useState<string | number | null>(null);

  const handleShowActionSheet = () => {
    const items: ActionSheetItem[] = [
      {
        value: 'edit',
        label: 'Edit Message',
        onPress: (item) => {
          console.log('Edit pressed:', item.value);
          setSelectedValue(item.value);
        },
      },
      {
        value: 'mark-unread',
        label: 'Mark Unread',
        onPress: (item) => {
          console.log('Mark unread pressed:', item.value);
          setSelectedValue(item.value);
        },
      },
      {
        value: 'remind',
        label: 'Remind Me',
        onPress: (item) => {
          console.log('Remind pressed:', item.value);
          setSelectedValue(item.value);
        },
      },
      {
        value: 'save',
        label: 'Add to Saved Items',
        onPress: (item) => {
          console.log('Save pressed:', item.value);
          setSelectedValue(item.value);
        },
      },
      {
        value: 'delete',
        label: 'Delete',
        color: '#E74C3C',
        onPress: (item) => {
          console.log('Delete pressed:', item.value);
          setSelectedValue(item.value);
        },
      },
    ];

    show({
      items,
      title: 'Actions',
      itemColor: '#333',
      backgroundColor: '#FFF',
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Show ActionSheet" onPress={handleShowActionSheet} />
      {selectedValue && (
        <Text style={styles.selectedText}>
          Selected: {selectedValue}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedText: {
    marginTop: 16,
    fontSize: 16,
    color: '#333',
  },
});
