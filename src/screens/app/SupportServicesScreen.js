import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Linking,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors, spacing, fontSize } from '../../constants/colors';
import Card from '../../components/Card';
import LoadingIndicator from '../../components/LoadingIndicator';
import { mockSupportServices } from '../../data/mockData';

export default function SupportServicesScreen() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setServices(mockSupportServices);
      setFilteredServices(mockSupportServices);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredServices(services);
    } else {
      setFilteredServices(
        services.filter((s) => s.category === selectedCategory)
      );
    }
  }, [selectedCategory, services]);

  const categories = [
    'all',
    ...new Set(services.map((s) => s.category)),
  ];

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const renderService = ({ item }) => (
    <Card style={styles.serviceCard}>
      <View style={styles.serviceHeader}>
        <View>
          <Text style={styles.serviceName}>{item.name}</Text>
          <Text style={styles.serviceCategory}>{item.category}</Text>
        </View>
        <View
          style={[
            styles.categoryBadge,
            {
              backgroundColor:
                item.category === 'Police'
                  ? colors.primary + '20'
                  : item.category === 'Hospital'
                  ? colors.danger + '20'
                  : colors.success + '20',
            },
          ]}
        >
          <Text
            style={[
              styles.categoryBadgeText,
              {
                color:
                  item.category === 'Police'
                    ? colors.primary
                    : item.category === 'Hospital'
                    ? colors.danger
                    : colors.success,
              },
            ]}
          >
            {item.category.charAt(0)}
          </Text>
        </View>
      </View>

      <Text style={styles.serviceDescription}>{item.description}</Text>

      <View style={styles.serviceMeta}>
        <View style={styles.metaItem}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={16}
            color={colors.gray}
          />
          <Text style={styles.metaText}>{item.hours}</Text>
        </View>
        <View style={styles.metaItem}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={16}
            color={colors.gray}
          />
          <Text style={styles.metaText}>{item.location.address}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.callButton}
        onPress={() => handleCall(item.phone)}
      >
        <MaterialCommunityIcons
          name="phone"
          size={18}
          color={colors.white}
        />
        <Text style={styles.callButtonText}>Call: {item.phone}</Text>
      </TouchableOpacity>
    </Card>
  );

  if (loading) {
    return <LoadingIndicator message="Loading services..." />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Support Services</Text>
        <Text style={styles.headerSubtitle}>
          Find help near you
        </Text>
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScrollView}
      >
        <View style={styles.categoriesContainer}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                selectedCategory === cat && styles.activeCategoryButton,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === cat && styles.activeCategoryButtonText,
                ]}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Services List */}
      <FlatList
        data={filteredServices}
        renderItem={renderService}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.servicesList}
        scrollEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.dark,
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    color: colors.gray,
    marginTop: spacing.xs,
  },
  categoriesScrollView: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  categoryButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.md,
    borderRadius: 20,
    backgroundColor: colors.light,
  },
  activeCategoryButton: {
    backgroundColor: colors.primary,
  },
  categoryButtonText: {
    fontSize: fontSize.sm,
    color: colors.gray,
    fontWeight: '500',
  },
  activeCategoryButtonText: {
    color: colors.white,
  },
  servicesList: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  serviceCard: {
    marginBottom: spacing.md,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  serviceName: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.dark,
  },
  serviceCategory: {
    fontSize: fontSize.sm,
    color: colors.gray,
    marginTop: spacing.xs,
  },
  categoryBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBadgeText: {
    fontWeight: '700',
    fontSize: fontSize.base,
  },
  serviceDescription: {
    fontSize: fontSize.sm,
    color: colors.gray,
    marginBottom: spacing.md,
    lineHeight: 18,
  },
  serviceMeta: {
    marginBottom: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  metaText: {
    fontSize: fontSize.sm,
    color: colors.gray,
    marginLeft: spacing.sm,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 8,
  },
  callButtonText: {
    color: colors.white,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
});
